import { randomUUID } from "node:crypto";
import type {
  Character,
  ChatSession,
  Message,
  Scene,
  User,
} from "@shared/schema";
import type { ProfileMetrics, UploadReference } from "@shared/domain";
import { hashPassword } from "../lib/security";

const now = () => new Date().toISOString();

const seedUserId = randomUUID();
const seedCharacterId = randomUUID();
const seedSceneId = randomUUID();
const seedChatId = randomUUID();

export const seedUsers: User[] = [
  {
    id: seedUserId,
    email: "demo@careersim.app",
    username: "dizzyingArredale3060",
    passwordHash: hashPassword("careersim-demo"),
    avatarUrl: null,
    bio: "Narrative designer exploring AI coaching.",
    createdAt: now(),
    updatedAt: now(),
  },
];

export const seedProfileMetrics: ProfileMetrics = {
  userId: seedUserId,
  totalChats: 42,
  scenesCreated: 6,
  hoursPracticed: 128,
  streakDays: 9,
  badges: ["agency-builder", "tone-master", "crisis-coach"],
};

export const seedCharacters: Character[] = [
  {
    id: seedCharacterId,
    ownerId: seedUserId,
    name: "Task Force 141",
    tagline: "Pulling you out of class",
    description:
      "Elite team dynamic for high-pressure conflict resolution scenarios.",
    greetings: [
      { text: "Price: \"Excuse me, we’re here to pull you out of class.\"", order: 0 },
      { text: "Ghost: \"Pack it up. Briefing in five.\"", order: 1 },
    ],
    tags: ["military", "crisis", "teamwork"],
    visibility: "public",
    aiGreetingEnabled: true,
    avatarUrl: null,
    stats: {
      sessionsCompleted: 2375,
      favorites: 860,
      rating: 4.8,
    },
    createdAt: now(),
    updatedAt: now(),
  },
];

export const seedScenes: Scene[] = [
  {
    id: seedSceneId,
    ownerId: seedUserId,
    type: "main-character",
    genres: ["crisis-response", "special-ops"],
    timePeriods: ["modern-day"],
    locations: ["london-hq"],
    tones: ["urgent", "supportive"],
    backstory:
      "An elite task force is navigating a leak at a critical moment in negotiations.",
    playerGoal: "Stabilize the situation and debrief leadership.",
    introText:
      "You’re pulled out of class by Task Force 141. A situation is unfolding.",
    characterGreeting: "Price nods, \"We’re glad you’re here. Let’s debrief.\"",
    name: "Crisis Manager — Task Force 141",
    coverImageUrl: null,
    chatThemeColor: "#111827",
    tags: ["conflict-resolution", "leadership", "communication"],
    visibility: "public",
    status: "published",
    linkedCharacterId: seedCharacterId,
    analytics: {
      plays: 12450,
      likes: 8750,
      bookmarks: 4320,
      rating: 4.9,
    },
    createdAt: now(),
    updatedAt: now(),
  },
];

export const seedChats: ChatSession[] = [
  {
    id: seedChatId,
    userId: seedUserId,
    sceneId: seedSceneId,
    characterId: seedCharacterId,
    title: "Crisis Manager — Task Force 141",
    status: "active",
    startedAt: now(),
    lastActivityAt: now(),
    settings: {
      preferredVoice: "price",
      aiFeedbackOn: true,
      autoSaveOn: true,
    },
  },
];

export const seedMessages: Message[] = [
  {
    id: randomUUID(),
    chatId: seedChatId,
    sender: "ai",
    body: `You were sitting in class, looking at the clock. The minutes were going by slowly, really slowly. That's when there's a knock on the door.\n\nThe teacher walks over and opens the door, and there stands the whole Task Force 141, aka: Your guardians.\n\nPrice: "Excuse me, we've here to pull DizzyingArredale3060 out of class. It's an emergency." The teacher looks stunned at the 6 men outside her classroom.`,
    metadata: {
      sentiment: "neutral",
      tone: "urgent",
      actions: ["notify-supervisor", "prep-debrief"],
    },
    createdAt: now(),
    likeState: "none",
  },
];

export const seedUploads: UploadReference[] = [
  {
    uploadId: randomUUID(),
    url: "https://files.careersim.app/uploads/demo-cover.png",
    expiresAt: now(),
  },
];

export const seedCollections = {
  featured: [seedScenes[0]],
  popular: [seedScenes[0]],
};
