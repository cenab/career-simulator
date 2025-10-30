import type {
  Character,
  ChatSession,
  InsertCharacter,
  InsertScene,
  InsertUser,
  Message,
  Scene,
  User,
} from "@shared/schema";
import type {
  CreateCharacterInput,
  CreateSceneInput,
  ProfileMetrics,
  UploadReference,
} from "@shared/domain";

export interface UserRepository {
  getById(id: string): Promise<User | undefined>;
  getByUsername(username: string): Promise<User | undefined>;
  getByEmail(email: string): Promise<User | undefined>;
  insert(payload: InsertUser): Promise<User>;
  update(
    id: string,
    payload: Partial<Pick<User, "username" | "bio" | "avatarUrl">>,
  ): Promise<User>;
  all(): Promise<User[]>;
}

export interface ProfileMetricsRepository {
  getByUserId(userId: string): Promise<ProfileMetrics | undefined>;
  upsert(metrics: ProfileMetrics): Promise<ProfileMetrics>;
}

export interface CharacterRepository {
  getById(id: string): Promise<Character | undefined>;
  listByOwner(ownerId: string): Promise<Character[]>;
  listPublic(): Promise<Character[]>;
  insert(payload: InsertCharacter): Promise<Character>;
  update(
    id: string,
    payload: Partial<CreateCharacterInput> & { avatarUrl?: string | null },
  ): Promise<Character>;
  delete(id: string): Promise<void>;
}

export interface SceneRepository {
  getById(id: string): Promise<Scene | undefined>;
  listPublic(): Promise<Scene[]>;
  listByOwner(ownerId: string): Promise<Scene[]>;
  insert(payload: InsertScene): Promise<Scene>;
  update(
    id: string,
    payload: Partial<CreateSceneInput> & { coverImageUrl?: string | null },
  ): Promise<Scene>;
  delete(id: string): Promise<void>;
}

export interface ChatRepository {
  getById(id: string): Promise<ChatSession | undefined>;
  listRecentByUser(userId: string): Promise<ChatSession[]>;
  listPinnedByUser(userId: string): Promise<ChatSession[]>;
  insert(payload: ChatSession): Promise<ChatSession>;
  update(id: string, payload: Partial<ChatSession>): Promise<ChatSession>;
}

export interface MessageRepository {
  listByChatId(chatId: string, options?: { limit?: number }): Promise<Message[]>;
  insert(payload: Message): Promise<Message>;
  update(id: string, payload: Partial<Message>): Promise<Message>;
}

export interface UploadRepository {
  createUpload(upload: UploadReference): Promise<UploadReference>;
  getById(uploadId: string): Promise<UploadReference | undefined>;
}

export interface CollectionRepository {
  listFeatured(): Promise<Scene[]>;
  listPopular(): Promise<Scene[]>;
}

export interface Storage {
  users: UserRepository;
  profileMetrics: ProfileMetricsRepository;
  characters: CharacterRepository;
  scenes: SceneRepository;
  chats: ChatRepository;
  messages: MessageRepository;
  uploads: UploadRepository;
  collections: CollectionRepository;
}
