import { z } from "zod";

export const visibilitySchema = z.enum(["public", "unlisted", "private"]);
export type Visibility = z.infer<typeof visibilitySchema>;

export const characterGreetingSchema = z.object({
  text: z.string().min(1),
  order: z.number().int().nonnegative(),
});

export const characterStatsSchema = z.object({
  sessionsCompleted: z.number().int().nonnegative(),
  favorites: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5).nullable(),
});

export const characterSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  name: z.string().min(1),
  tagline: z.string().default(""),
  description: z.string().default(""),
  greetings: z.array(characterGreetingSchema),
  tags: z.array(z.string()),
  visibility: visibilitySchema,
  aiGreetingEnabled: z.boolean(),
  avatarUrl: z.string().url().nullable(),
  stats: characterStatsSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Character = z.infer<typeof characterSchema>;

export const createCharacterInputSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().default(""),
  description: z.string().default(""),
  greetings: z.array(characterGreetingSchema).default([]),
  tags: z.array(z.string()).default([]),
  visibility: visibilitySchema,
  aiGreetingEnabled: z.boolean().default(false),
  avatarUploadId: z.string().uuid().optional(),
});
export type CreateCharacterInput = z.infer<typeof createCharacterInputSchema>;

export const sceneTypeSchema = z.enum(["any-character", "main-character"]);
export type SceneType = z.infer<typeof sceneTypeSchema>;

export const sceneStatusSchema = z.enum(["draft", "published"]);
export type SceneStatus = z.infer<typeof sceneStatusSchema>;

export const sceneAnalyticsSchema = z.object({
  plays: z.number().int().nonnegative(),
  likes: z.number().int().nonnegative(),
  bookmarks: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5).nullable(),
});

export const sceneSchema = z.object({
  id: z.string().uuid(),
  ownerId: z.string().uuid(),
  type: sceneTypeSchema,
  genres: z.array(z.string()),
  timePeriods: z.array(z.string()),
  locations: z.array(z.string()),
  tones: z.array(z.string()),
  backstory: z.string(),
  playerGoal: z.string(),
  introText: z.string(),
  characterGreeting: z.string(),
  name: z.string(),
  coverImageUrl: z.string().url().nullable(),
  chatThemeColor: z.string(),
  tags: z.array(z.string()),
  visibility: visibilitySchema,
  status: sceneStatusSchema,
  linkedCharacterId: z.string().uuid().nullable(),
  analytics: sceneAnalyticsSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Scene = z.infer<typeof sceneSchema>;

export const createSceneInputSchema = z.object({
  type: sceneTypeSchema,
  genres: z.array(z.string()),
  timePeriods: z.array(z.string()),
  locations: z.array(z.string()),
  tones: z.array(z.string()),
  backstory: z.string(),
  playerGoal: z.string(),
  introText: z.string(),
  characterGreeting: z.string(),
  name: z.string(),
  coverUploadId: z.string().uuid().optional(),
  chatThemeColor: z.string(),
  tags: z.array(z.string()),
  visibility: visibilitySchema,
  linkedCharacterId: z.string().uuid().optional(),
  status: sceneStatusSchema.optional(),
});
export type CreateSceneInput = z.infer<typeof createSceneInputSchema>;

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string(),
  avatarUrl: z.string().url().nullable(),
  bio: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type User = z.infer<typeof userSchema>;

export const profileMetricsSchema = z.object({
  userId: z.string().uuid(),
  totalChats: z.number().int().nonnegative(),
  scenesCreated: z.number().int().nonnegative(),
  hoursPracticed: z.number().int().nonnegative(),
  streakDays: z.number().int().nonnegative(),
  badges: z.array(z.string()),
});
export type ProfileMetrics = z.infer<typeof profileMetricsSchema>;

export const chatSessionStatusSchema = z.enum(["active", "archived", "completed"]);
export type ChatSessionStatus = z.infer<typeof chatSessionStatusSchema>;

export const chatSessionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  sceneId: z.string().uuid(),
  characterId: z.string().uuid().nullable(),
  title: z.string(),
  status: chatSessionStatusSchema,
  startedAt: z.string().datetime(),
  lastActivityAt: z.string().datetime(),
  settings: z.object({
    preferredVoice: z.string().nullable(),
    aiFeedbackOn: z.boolean(),
    autoSaveOn: z.boolean(),
  }),
});
export type ChatSession = z.infer<typeof chatSessionSchema>;

export const messageSenderSchema = z.enum(["user", "ai"]);
export type MessageSender = z.infer<typeof messageSenderSchema>;

export const messageSchema = z.object({
  id: z.string().uuid(),
  chatId: z.string().uuid(),
  sender: messageSenderSchema,
  body: z.string(),
  metadata: z
    .object({
      sentiment: z.string().nullable(),
      tone: z.string().nullable(),
      actions: z.array(z.string()).default([]),
    })
    .optional(),
  createdAt: z.string().datetime(),
  likeState: z.enum(["like", "dislike", "none"]).default("none"),
});
export type Message = z.infer<typeof messageSchema>;

export const searchIndexItemSchema = z.object({
  id: z.string().uuid(),
  type: z.enum(["character", "scene", "user"]),
  title: z.string(),
  subtitle: z.string(),
  thumbnailUrl: z.string().url().nullable(),
  tags: z.array(z.string()).default([]),
  popularityScore: z.number().nonnegative(),
});
export type SearchIndexItem = z.infer<typeof searchIndexItemSchema>;

export const uploadReferenceSchema = z.object({
  uploadId: z.string().uuid(),
  url: z.string().url(),
  expiresAt: z.string().datetime(),
});
export type UploadReference = z.infer<typeof uploadReferenceSchema>;

export const apiMetaPaginationSchema = z.object({
  cursor: z.string().nullable(),
  hasMore: z.boolean(),
});

export type ApiMetaPagination = z.infer<typeof apiMetaPaginationSchema>;
