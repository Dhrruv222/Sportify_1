from typing import Dict, Any

import os
from fastapi import FastAPI, Header, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Sportify AI Service")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


class ScoutScoreRequest(BaseModel):
    playerId: str = Field(min_length=1)
    stats: Dict[str, Any] = Field(default_factory=dict)


class ScoutScoreResponse(BaseModel):
    score: int
    breakdown: Dict[str, int]


def clamp_score(value: Any, default: int = 70) -> int:
    try:
        numeric = int(round(float(value)))
    except (TypeError, ValueError):
        numeric = default
    return max(0, min(100, numeric))


def fallback_scout_score(stats: Dict[str, Any]) -> ScoutScoreResponse:
    pace = clamp_score(stats.get("pace") or stats.get("speed"), 70)
    technical = clamp_score(stats.get("technical") or stats.get("technique"), 70)
    physical = clamp_score(stats.get("physical") or stats.get("strength"), 70)
    mental = clamp_score(stats.get("mental") or stats.get("iq"), 70)
    score = round((pace + technical + physical + mental) / 4)

    return ScoutScoreResponse(
        score=score,
        breakdown={
            "pace": pace,
            "technical": technical,
            "physical": physical,
            "mental": mental,
        },
    )


@app.post("/internal/scout-score", response_model=ScoutScoreResponse)
def internal_scout_score(
    payload: ScoutScoreRequest,
    x_internal_api_key: str | None = Header(default=None),
) -> ScoutScoreResponse:
    required_key = os.getenv("INTERNAL_API_KEY")
    if required_key and x_internal_api_key != required_key:
        raise HTTPException(status_code=401, detail="Invalid internal API key")

    return fallback_scout_score(payload.stats)
