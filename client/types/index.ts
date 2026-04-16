/* ──────────────────────────────────────────────────
   Sportify – shared TypeScript interfaces
   ────────────────────────────────────────────────── */

export interface Profile {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  position: string | null;
  location: string | null;
  dominantFoot: string | null;
  height: number | null;
  weight: number | null;
  avatarUrl: string | null;
  coverPhotoUrl: string | null;
  playingStyle: string | null;
  skills: Record<string, number> | null;
  bio: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  careerHistories: CareerHistory[];
  achievements: Achievement[];
}

export interface CareerHistory {
  id: string;
  clubName: string;
  position: string;
  startDate: string;
  endDate: string | null;
}

export interface Achievement {
  id: string;
  title: string;
  description: string | null;
}

export interface FeedPost {
  id: string;
  userId: string;
  type: string;
  content: string | null;
  mediaUrl: string | null;
  thumbnailUrl: string | null;
  createdAt: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    role: string;
  };
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
}

export interface Conversation {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientAvatar: string | null;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
}

export interface FitpassQr {
  qrCodeUrl: string;
  planName: string;
  expiresAt: string;
  status: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
