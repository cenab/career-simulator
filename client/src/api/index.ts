import { apiRequest } from "@/lib/queryClient";
import { API_ROUTES } from "./routes";
import type {
  Character,
  ChatSession,
  CreateCharacterInput,
  CreateSceneInput,
  Message,
  ProfileMetrics,
  Scene,
  UploadReference,
  User,
} from "./types";

type ApiResponse<T> = { data: T; meta?: Record<string, unknown> };

export async function fetchSession() {
  const res = await apiRequest("GET", API_ROUTES.auth.session);
  return (await res.json()) as ApiResponse<{
    user: Omit<User, "passwordHash"> | undefined;
    metrics: ProfileMetrics | null;
    preferences: {
      aiFeedbackOn: boolean;
      autoSaveOn: boolean;
      emailNotifications: boolean;
    };
  }>;
}

export async function login(identifier: string, password: string) {
  const res = await apiRequest("POST", API_ROUTES.auth.login, {
    identifier,
    password,
  });
  return (await res.json()) as ApiResponse<{
    user: Omit<User, "passwordHash"> | undefined;
    metrics: ProfileMetrics | null;
    tokens: { accessToken: string; refreshToken: string };
  }>;
}

export async function signup(payload: {
  email: string;
  username: string;
  password: string;
}) {
  const res = await apiRequest("POST", API_ROUTES.auth.signup, payload);
  return (await res.json()) as ApiResponse<{
    user: Omit<User, "passwordHash"> | undefined;
    metrics: ProfileMetrics | null;
    tokens: { accessToken: string; refreshToken: string };
  }>;
}

export async function listCharacters(queryString?: string) {
  const res = await apiRequest(
    "GET",
    API_ROUTES.characters.list(queryString),
  );
  return (await res.json()) as ApiResponse<{ items: Character[] }>;
}

export async function listScenes(queryString?: string) {
  const res = await apiRequest("GET", API_ROUTES.scenes.list(queryString));
  return (await res.json()) as ApiResponse<{ items: Scene[] }>;
}

export async function createCharacter(payload: CreateCharacterInput) {
  const res = await apiRequest("POST", API_ROUTES.characters.list(), payload);
  return (await res.json()) as ApiResponse<{ character: Character }>;
}

export async function createScene(payload: CreateSceneInput) {
  const res = await apiRequest("POST", API_ROUTES.scenes.list(), payload);
  return (await res.json()) as ApiResponse<{ scene: Scene }>;
}

export async function createUpload(payload: {
  filename: string;
  mimeType: string;
}) {
  const res = await apiRequest("POST", API_ROUTES.uploads.root, payload);
  return (await res.json()) as ApiResponse<{
    upload: UploadReference;
    fields: Record<string, string>;
  }>;
}

export async function startChat(payload: {
  sceneId: string;
  characterId?: string;
  mode?: "story" | "practice";
}) {
  const res = await apiRequest("POST", API_ROUTES.chats.root, payload);
  return (await res.json()) as ApiResponse<{ chat: ChatSession }>;
}

export async function fetchChatMessages(chatId: string) {
  const res = await apiRequest(
    "GET",
    API_ROUTES.chats.messages(chatId),
  );
  return (await res.json()) as ApiResponse<{ items: Message[] }>;
}

export async function postChatMessage(chatId: string, body: string) {
  const res = await apiRequest("POST", API_ROUTES.chats.messages(chatId), {
    body,
  });
  return (await res.json()) as ApiResponse<{ message: Message }>;
}
