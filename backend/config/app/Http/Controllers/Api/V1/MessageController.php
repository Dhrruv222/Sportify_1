<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Message;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;

class MessageController extends Controller
{
    public function conversations(Request $request): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');
            $userId = $jwtUser['userId'];

            // Fetch all messages involving this user, newest first.
            // PHP-level deduplication avoids DISTINCT ON (PostgreSQL-only) so
            // this query runs on both MySQL and PostgreSQL.
            $messages = Message::where('sender_id', $userId)
                ->orWhere('receiver_id', $userId)
                ->orderBy('created_at', 'desc')
                ->get(['id', 'sender_id', 'receiver_id', 'content', 'created_at', 'is_read']);

            // Keep only the first (most-recent) row per partner
            $seen = [];
            $rawConversations = [];
            foreach ($messages as $msg) {
                $partnerId = $msg->sender_id === $userId ? $msg->receiver_id : $msg->sender_id;
                if (! isset($seen[$partnerId])) {
                    $seen[$partnerId] = true;
                    $rawConversations[] = [
                        'partnerId'     => $partnerId,
                        'lastMessage'   => $msg->content,
                        'lastMessageAt' => $msg->created_at,
                        'isRead'        => $msg->is_read,
                    ];
                }
            }

            // Hydrate partner info in a single query
            $partnerIds = array_column($rawConversations, 'partnerId');
            $partners = User::whereIn('id', $partnerIds)
                ->get(['id', 'email', 'role', 'profile_photo'])
                ->keyBy('id');

            $result = array_map(function ($c) use ($partners) {
                $partner = $partners[$c['partnerId']] ?? null;

                return [
                    'partnerId'     => $c['partnerId'],
                    'partnerEmail'  => $partner?->email,
                    'partnerRole'   => $partner?->role,
                    'partnerPhoto'  => $partner?->profile_photo,
                    'lastMessage'   => $c['lastMessage'],
                    'lastMessageAt' => $c['lastMessageAt'],
                    'isRead'        => $c['isRead'],
                ];
            }, $rawConversations);

            return response()->json(['status' => 'success', 'data' => $result]);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function unreadCount(Request $request): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');
            $count = Message::where('receiver_id', $jwtUser['userId'])
                ->where('is_read', false)
                ->count();

            return response()->json(['status' => 'success', 'data' => ['unreadCount' => $count]]);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function thread(Request $request, string $userId): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');
            $myId = $jwtUser['userId'];

            $messages = Message::where(function ($q) use ($myId, $userId) {
                $q->where('sender_id', $myId)->where('receiver_id', $userId);
            })->orWhere(function ($q) use ($myId, $userId) {
                $q->where('sender_id', $userId)->where('receiver_id', $myId);
            })->orderBy('created_at', 'asc')->get();

            return response()->json(['status' => 'success', 'data' => $messages]);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    public function send(Request $request, string $userId): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');
            $senderId = $jwtUser['userId'];
            $content = $request->input('content');

            if (! $content) {
                return response()->json(['status' => 'error', 'message' => 'Content is required'], 400);
            }

            User::findOrFail($userId); // recipient must exist

            $message = Message::create([
                'sender_id' => $senderId,
                'receiver_id' => $userId,
                'content' => $content,
            ]);

            return response()->json(['status' => 'success', 'data' => $message], 201);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 400);
        }
    }

    public function markAsRead(Request $request, string $userId): JsonResponse
    {
        try {
            $jwtUser = $request->input('jwt_user');
            $myId = $jwtUser['userId'];

            $updated = Message::where('sender_id', $userId)
                ->where('receiver_id', $myId)
                ->where('is_read', false)
                ->update(['is_read' => true]);

            return response()->json(['status' => 'success', 'data' => ['marked' => $updated]]);
        } catch (\Throwable $e) {
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}
