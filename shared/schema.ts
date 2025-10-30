import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import {
  sceneStatusSchema,
  sceneTypeSchema,
  visibilitySchema,
} from "./domain";

export const visibilityEnum = pgEnum("visibility", visibilitySchema.options);
export const sceneTypeEnum = pgEnum("scene_type", sceneTypeSchema.options);
export const sceneStatusEnum = pgEnum("scene_status", sceneStatusSchema.options);

export const users = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  avatarUrl: text("avatar_url"),
  bio: text(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

const baseInsertUserSchema = createInsertSchema(users);

export const insertUserSchema = baseInsertUserSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    email: z.string().email(),
  });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const profileMetrics = pgTable(
  "profile_metrics",
  {
    userId: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    totalChats: integer("total_chats").notNull().default(0),
    scenesCreated: integer("scenes_created").notNull().default(0),
    hoursPracticed: integer("hours_practiced").notNull().default(0),
    streakDays: integer("streak_days").notNull().default(0),
    badges: jsonb("badges").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId] }),
  }),
);

export const characters = pgTable("characters", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
  ownerId: varchar("owner_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text().notNull(),
  tagline: text().notNull().default(""),
  description: text().notNull().default(""),
  greetings: jsonb("greetings")
    .$type<{ text: string; order: number }[]>()
    .notNull()
    .default(sql`'[]'::jsonb`),
  tags: jsonb("tags").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  visibility: visibilityEnum("visibility").notNull().default("public"),
  aiGreetingEnabled: boolean("ai_greeting_enabled").notNull().default(false),
  avatarUrl: text("avatar_url"),
  stats: jsonb("stats")
    .$type<{ sessionsCompleted: number; favorites: number; rating: number | null }>()
    .notNull()
    .default(sql`'{"sessionsCompleted":0,"favorites":0,"rating":null}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const insertCharacterSchema = createInsertSchema(characters).omit({
  id: true,
  stats: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCharacter = z.infer<typeof insertCharacterSchema>;
export type Character = typeof characters.$inferSelect;

export const scenes = pgTable("scenes", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
  ownerId: varchar("owner_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: sceneTypeEnum("type").notNull(),
  genres: jsonb("genres").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  timePeriods: jsonb("time_periods").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  locations: jsonb("locations").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  tones: jsonb("tones").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  backstory: text().notNull().default(""),
  playerGoal: text("player_goal").notNull().default(""),
  introText: text("intro_text").notNull().default(""),
  characterGreeting: text("character_greeting").notNull().default(""),
  name: text().notNull(),
  coverImageUrl: text("cover_image_url"),
  chatThemeColor: text("chat_theme_color").notNull().default("#000000"),
  tags: jsonb("tags").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
  visibility: visibilityEnum("visibility").notNull().default("public"),
  status: sceneStatusEnum("status").notNull().default("draft"),
  linkedCharacterId: varchar("linked_character_id", { length: 36 }).references(
    () => characters.id,
    { onDelete: "set null" },
  ),
  analytics: jsonb("analytics")
    .$type<{ plays: number; likes: number; bookmarks: number; rating: number | null }>()
    .notNull()
    .default(
      sql`'{"plays":0,"likes":0,"bookmarks":0,"rating":null}'::jsonb`,
    ),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const insertSceneSchema = createInsertSchema(scenes).omit({
  id: true,
  analytics: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertScene = z.infer<typeof insertSceneSchema>;
export type Scene = typeof scenes.$inferSelect;

export const chatSessions = pgTable("chat_sessions", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sceneId: varchar("scene_id", { length: 36 })
    .notNull()
    .references(() => scenes.id, { onDelete: "cascade" }),
  characterId: varchar("character_id", { length: 36 }).references(() => characters.id),
  title: text().notNull(),
  status: text().notNull().default("active"),
  startedAt: timestamp("started_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  lastActivityAt: timestamp("last_activity_at", {
    withTimezone: true,
    mode: "string",
  }).defaultNow(),
  settings: jsonb("settings")
    .$type<{ preferredVoice: string | null; aiFeedbackOn: boolean; autoSaveOn: boolean }>()
    .notNull()
    .default(
      sql`'{"preferredVoice":null,"aiFeedbackOn":false,"autoSaveOn":true}'::jsonb`,
    ),
});

export type ChatSession = typeof chatSessions.$inferSelect;

export const messages = pgTable("messages", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
  chatId: varchar("chat_id", { length: 36 })
    .notNull()
    .references(() => chatSessions.id, { onDelete: "cascade" }),
  sender: text().notNull(),
  body: text().notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default(sql`'{}'::jsonb`),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  likeState: text("like_state").notNull().default("none"),
});

export type Message = typeof messages.$inferSelect;

export const uploads = pgTable("uploads", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
  url: text().notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default(sql`'{}'::jsonb`),
});

export const collections = pgTable("collections", {
  id: varchar("id", { length: 36 }).primaryKey().default(sql`gen_random_uuid()`),
  slug: text().notNull().unique(),
  title: text().notNull(),
  description: text(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  visibility: visibilityEnum("visibility").notNull().default("public"),
});

export const collectionItems = pgTable(
  "collection_items",
  {
    collectionId: varchar("collection_id", { length: 36 })
      .notNull()
      .references(() => collections.id, { onDelete: "cascade" }),
    entityId: varchar("entity_id", { length: 36 }).notNull(),
    entityType: text("entity_type").notNull(),
    position: integer("position").notNull().default(0),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default(sql`'{}'::jsonb`),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.collectionId, table.entityId] }),
  }),
);
