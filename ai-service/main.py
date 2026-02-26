from fastapi import FastAPI

app = FastAPI(title="Sportify AI Service")


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
