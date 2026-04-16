<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Follow;
use App\Models\User;
use App\Models\Video;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class SocialController extends Controller
{
    public function follow(Request $request, string $id): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');
            $followerId = $jwtUser['userId'];

            if ($followerId === $id) {
                return response()->json(['status' => 'error', 'message' => 'Cannot follow yourself'], 400);
            }

            User::findOrFail($id); // target must exist

            $existing = Follow::where('follower_id', $followerId)->where('followed_id', $id)->first();
            if ($existing) {
                return response()->json(['status' => 'error', 'message' => 'Already following'], 409);
            }

            Follow::create(['follower_id' => $followerId, 'followed_id' => $id]);

            return response()->json(['status' => 'success', 'data' => ['followed' => $id]], 201);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    public function unfollow(Request $request, string $id): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');
            $followerId = $jwtUser['userId'];

            $follow = Follow::where('follower_id', $followerId)->where('followed_id', $id)->first();
            if (! $follow) {
                return response()->json(['status' => 'error', 'message' => 'Not following'], 404);
            }

            $follow->delete();

            return response()->json(['status' => 'success', 'data' => ['unfollowed' => $id]]);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    public function followers(Request $request): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');

            $followers = Follow::with('follower:id,email,role,profile_photo')
                ->where('followed_id', $jwtUser['userId'])
                ->orderBy('created_at', 'desc')
                ->get()
                ->pluck('follower');

            return response()->json(['status' => 'success', 'data' => $followers]);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function following(Request $request): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');

            $following = Follow::with('followed:id,email,role,profile_photo')
                ->where('follower_id', $jwtUser['userId'])
                ->orderBy('created_at', 'desc')
                ->get()
                ->pluck('followed');

            return response()->json(['status' => 'success', 'data' => $following]);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function feed(Request $request): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');
            $userId = $jwtUser['userId'];
            $page = max(1, (int) $request->query('page', 1));
            $limit = min(50, max(1, (int) $request->query('limit', 20)));

            // Feed = videos from users the caller follows
            $followedIds = Follow::where('follower_id', $userId)->pluck('followed_id');

            // Get player IDs of followed users
            $playerIds = \App\Models\Player::whereIn('user_id', $followedIds)->pluck('id');

            $query = Video::with(['player.user', 'tags'])
                ->withCount(['likes', 'comments'])
                ->whereIn('player_id', $playerIds)
                ->orderBy('created_at', 'desc');

            $total = $query->count();
            $videos = $query->skip(($page - 1) * $limit)->take($limit)->get();

            // Determine which of these videos the caller has liked
            $likedVideoIds = \App\Models\Like::where('user_id', $userId)
                ->whereIn('video_id', $videos->pluck('id')->all())
                ->pluck('video_id')
                ->flip()
                ->all();

            // Transform to FeedPost shape expected by the frontend
            $mapped = $videos->map(function (Video $video) use ($likedVideoIds) {
                $player = $video->player;
                $user   = $player?->user;

                return [
                    'id'           => $video->id,
                    'userId'       => $player?->user_id ?? '',
                    'type'         => 'VIDEO',
                    'content'      => $video->description ?: $video->title,
                    'mediaUrl'     => $video->url,
                    'thumbnailUrl' => $video->thumbnail,
                    'createdAt'    => $video->created_at,
                    'user'         => [
                        'id'        => $user?->id ?? '',
                        'firstName' => $player?->first_name ?? '',
                        'lastName'  => $player?->last_name ?? '',
                        'avatarUrl' => $user?->profile_photo,
                        'role'      => $user?->role ?? '',
                    ],
                    'likesCount'    => $video->likes_count ?? 0,
                    'commentsCount' => $video->comments_count ?? 0,
                    'isLiked'       => isset($likedVideoIds[$video->id]),
                ];
            });

            return response()->json([
                'status' => 'success',
                'data' => [
                    'videos' => $mapped,
                    'pagination' => [
                        'page'  => $page,
                        'limit' => $limit,
                        'total' => $total,
                    ],
                ],
            ]);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
