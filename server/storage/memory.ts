import { randomUUID } from "node:crypto";
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
import {
  seedChats,
  seedCharacters,
  seedCollections,
  seedMessages,
  seedProfileMetrics,
  seedScenes,
  seedUploads,
  seedUsers,
} from "./fixtures";
import type {
  CharacterRepository,
  ChatRepository,
  CollectionRepository,
  MessageRepository,
  ProfileMetricsRepository,
  SceneRepository,
  Storage,
  UploadRepository,
  UserRepository,
} from "./types";

const clone = <T>(value: T): T => structuredClone(value);

class InMemoryUserRepository implements UserRepository {
  private users = new Map<string, User>();

  constructor(seed: User[]) {
    seed.forEach((user) => this.users.set(user.id, user));
  }

  async getById(id: string) {
    const user = this.users.get(id);
    return user ? clone(user) : undefined;
  }

  async getByUsername(username: string) {
    const user = Array.from(this.users.values()).find(
      (candidate) => candidate.username === username,
    );
    return user ? clone(user) : undefined;
  }

  async getByEmail(email: string) {
    const user = Array.from(this.users.values()).find(
      (candidate) => candidate.email === email,
    );
    return user ? clone(user) : undefined;
  }

  async insert(payload: InsertUser) {
    const user: User = {
      id: randomUUID(),
      email: payload.email,
      username: payload.username,
      passwordHash: payload.passwordHash,
      avatarUrl: payload.avatarUrl ?? null,
      bio: payload.bio ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.set(user.id, user);
    return clone(user);
  }

  async update(
    id: string,
    payload: Partial<Pick<User, "username" | "bio" | "avatarUrl">>,
  ) {
    const existing = this.users.get(id);
    if (!existing) {
      throw new Error(`User ${id} not found`);
    }

    const updated: User = {
      ...existing,
      ...payload,
      updatedAt: new Date().toISOString(),
    };

    this.users.set(id, updated);
    return clone(updated);
  }

  async all() {
    return Array.from(this.users.values()).map(clone);
  }
}

class InMemoryProfileMetricsRepository implements ProfileMetricsRepository {
  private metrics = new Map<string, ProfileMetrics>();

  constructor(seed: ProfileMetrics) {
    this.metrics.set(seed.userId, seed);
  }

  async getByUserId(userId: string) {
    const entry = this.metrics.get(userId);
    return entry ? clone(entry) : undefined;
  }

  async upsert(metrics: ProfileMetrics) {
    this.metrics.set(metrics.userId, metrics);
    return clone(metrics);
  }
}

class InMemoryCharacterRepository implements CharacterRepository {
  private characters = new Map<string, Character>();

  constructor(seed: Character[]) {
    seed.forEach((character) => this.characters.set(character.id, character));
  }

  async getById(id: string) {
    const character = this.characters.get(id);
    return character ? clone(character) : undefined;
  }

  async listByOwner(ownerId: string) {
    return Array.from(this.characters.values())
      .filter((character) => character.ownerId === ownerId)
      .map(clone);
  }

  async listPublic() {
    return Array.from(this.characters.values())
      .filter((character) => character.visibility === "public")
      .map(clone);
  }

  async insert(payload: InsertCharacter) {
    const id = randomUUID();
    const now = new Date().toISOString();
    const character: Character = {
      id,
      ownerId: payload.ownerId,
      name: payload.name,
      tagline: payload.tagline ?? "",
      description: payload.description ?? "",
      greetings: payload.greetings ? [...payload.greetings] : [],
      tags: payload.tags ? [...payload.tags] : [],
      visibility: payload.visibility ?? "private",
      aiGreetingEnabled: payload.aiGreetingEnabled ?? false,
      avatarUrl: payload.avatarUrl ?? null,
      stats: {
        sessionsCompleted: 0,
        favorites: 0,
        rating: null,
      },
      createdAt: now,
      updatedAt: now,
    };

    this.characters.set(id, character);
    return clone(character);
  }

  async update(
    id: string,
    payload: Partial<CreateCharacterInput> & { avatarUrl?: string | null },
  ) {
    const existing = this.characters.get(id);
    if (!existing) {
      throw new Error(`Character ${id} not found`);
    }

    const updated: Character = {
      ...existing,
      ...payload,
      greetings: payload.greetings
        ? [...payload.greetings]
        : [...existing.greetings],
      tags: payload.tags ? [...payload.tags] : [...existing.tags],
      visibility: payload.visibility ?? existing.visibility,
      aiGreetingEnabled:
        payload.aiGreetingEnabled ?? existing.aiGreetingEnabled,
      avatarUrl: payload.avatarUrl ?? existing.avatarUrl,
      updatedAt: new Date().toISOString(),
    };

    this.characters.set(id, updated);
    return clone(updated);
  }

  async delete(id: string) {
    this.characters.delete(id);
  }
}

class InMemorySceneRepository implements SceneRepository {
  private scenes = new Map<string, Scene>();

  constructor(seed: Scene[]) {
    seed.forEach((scene) => this.scenes.set(scene.id, scene));
  }

  async getById(id: string) {
    const scene = this.scenes.get(id);
    return scene ? clone(scene) : undefined;
  }

  async listPublic() {
    return Array.from(this.scenes.values())
      .filter((scene) => scene.visibility === "public")
      .map(clone);
  }

  async listByOwner(ownerId: string) {
    return Array.from(this.scenes.values())
      .filter((scene) => scene.ownerId === ownerId)
      .map(clone);
  }

  async insert(payload: InsertScene) {
    const id = randomUUID();
    const now = new Date().toISOString();
    const scene: Scene = {
      id,
      ownerId: payload.ownerId,
      type: payload.type,
      genres: payload.genres ? [...payload.genres] : [],
      timePeriods: payload.timePeriods ? [...payload.timePeriods] : [],
      locations: payload.locations ? [...payload.locations] : [],
      tones: payload.tones ? [...payload.tones] : [],
      backstory: payload.backstory ?? "",
      playerGoal: payload.playerGoal ?? "",
      introText: payload.introText ?? "",
      characterGreeting: payload.characterGreeting ?? "",
      name: payload.name,
      coverImageUrl: payload.coverImageUrl ?? null,
      chatThemeColor: payload.chatThemeColor ?? "#000000",
      tags: payload.tags ? [...payload.tags] : [],
      visibility: payload.visibility ?? "private",
      status: payload.status ?? "draft",
      linkedCharacterId: payload.linkedCharacterId ?? null,
      analytics: {
        plays: 0,
        likes: 0,
        bookmarks: 0,
        rating: null,
      },
      createdAt: now,
      updatedAt: now,
    };

    this.scenes.set(id, scene);
    return clone(scene);
  }

  async update(
    id: string,
    payload: Partial<CreateSceneInput> & { coverImageUrl?: string | null },
  ) {
    const existing = this.scenes.get(id);
    if (!existing) {
      throw new Error(`Scene ${id} not found`);
    }

    const updated: Scene = {
      ...existing,
      ...payload,
      timePeriods: payload.timePeriods
        ? [...payload.timePeriods]
        : [...existing.timePeriods],
      locations: payload.locations
        ? [...payload.locations]
        : [...existing.locations],
      tones: payload.tones ? [...payload.tones] : [...existing.tones],
      genres: payload.genres ? [...payload.genres] : [...existing.genres],
      tags: payload.tags ? [...payload.tags] : [...existing.tags],
      visibility: payload.visibility ?? existing.visibility,
      status: payload.status ?? existing.status,
      linkedCharacterId:
        payload.linkedCharacterId ?? existing.linkedCharacterId,
      chatThemeColor: payload.chatThemeColor ?? existing.chatThemeColor,
      coverImageUrl: payload.coverImageUrl ?? existing.coverImageUrl,
      updatedAt: new Date().toISOString(),
    };

    this.scenes.set(id, updated);
    return clone(updated);
  }

  async delete(id: string) {
    this.scenes.delete(id);
  }
}

class InMemoryChatRepository implements ChatRepository {
  private chats = new Map<string, ChatSession>();

  constructor(seed: ChatSession[]) {
    seed.forEach((chat) => this.chats.set(chat.id, chat));
  }

  async getById(id: string) {
    const chat = this.chats.get(id);
    return chat ? clone(chat) : undefined;
  }

  async listRecentByUser(userId: string) {
    return Array.from(this.chats.values())
      .filter((chat) => chat.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.lastActivityAt ?? b.startedAt).getTime() -
          new Date(a.lastActivityAt ?? a.startedAt).getTime(),
      )
      .map(clone);
  }

  async listPinnedByUser(_userId: string) {
    // In-memory prototype does not persist pin state; return recent list for now.
    return this.listRecentByUser(_userId);
  }

  async insert(payload: ChatSession) {
    const chat: ChatSession = {
      ...payload,
      id: payload.id ?? randomUUID(),
      startedAt: payload.startedAt ?? new Date().toISOString(),
      lastActivityAt: payload.lastActivityAt ?? new Date().toISOString(),
    };

    this.chats.set(chat.id, chat);
    return clone(chat);
  }

  async update(id: string, payload: Partial<ChatSession>) {
    const existing = this.chats.get(id);
    if (!existing) {
      throw new Error(`Chat session ${id} not found`);
    }

    const updated: ChatSession = {
      ...existing,
      ...payload,
      lastActivityAt: payload.lastActivityAt ?? new Date().toISOString(),
    };

    this.chats.set(id, updated);
    return clone(updated);
  }
}

class InMemoryMessageRepository implements MessageRepository {
  private messages = new Map<string, Message>();

  constructor(seed: Message[]) {
    seed.forEach((message) => this.messages.set(message.id, message));
  }

  async listByChatId(chatId: string, options?: { limit?: number }) {
    const items = Array.from(this.messages.values())
      .filter((message) => message.chatId === chatId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );

    const limit = options?.limit ?? items.length;
    return items.slice(0, limit).map(clone);
  }

  async insert(payload: Message) {
    const message: Message = {
      ...payload,
      id: payload.id ?? randomUUID(),
      createdAt: payload.createdAt ?? new Date().toISOString(),
    };

    this.messages.set(message.id, message);
    return clone(message);
  }

  async update(id: string, payload: Partial<Message>) {
    const existing = this.messages.get(id);
    if (!existing) {
      throw new Error(`Message ${id} not found`);
    }

    const updated: Message = {
      ...existing,
      ...payload,
    };

    this.messages.set(id, updated);
    return clone(updated);
  }
}

class InMemoryUploadRepository implements UploadRepository {
  private uploads = new Map<string, UploadReference>();

  constructor(seed: UploadReference[]) {
    seed.forEach((upload) => this.uploads.set(upload.uploadId, upload));
  }

  async createUpload(upload: UploadReference) {
    const record: UploadReference = {
      ...upload,
      uploadId: upload.uploadId ?? randomUUID(),
    };

    this.uploads.set(record.uploadId, record);
    return clone(record);
  }

  async getById(uploadId: string) {
    const upload = this.uploads.get(uploadId);
    return upload ? clone(upload) : undefined;
  }
}

class InMemoryCollectionRepository implements CollectionRepository {
  constructor(
    private readonly featured: Scene[],
    private readonly popular: Scene[],
  ) {}

  async listFeatured() {
    return this.featured.map(clone);
  }

  async listPopular() {
    return this.popular.map(clone);
  }
}

export class InMemoryStorage implements Storage {
  users: UserRepository;
  profileMetrics: ProfileMetricsRepository;
  characters: CharacterRepository;
  scenes: SceneRepository;
  chats: ChatRepository;
  messages: MessageRepository;
  uploads: UploadRepository;
  collections: CollectionRepository;

  constructor() {
    this.users = new InMemoryUserRepository(seedUsers);
    this.profileMetrics = new InMemoryProfileMetricsRepository(
      seedProfileMetrics,
    );
    this.characters = new InMemoryCharacterRepository(seedCharacters);
    this.scenes = new InMemorySceneRepository(seedScenes);
    this.chats = new InMemoryChatRepository(seedChats);
    this.messages = new InMemoryMessageRepository(seedMessages);
    this.uploads = new InMemoryUploadRepository(seedUploads);
    this.collections = new InMemoryCollectionRepository(
      seedCollections.featured,
      seedCollections.popular,
    );
  }
}

export const storage: Storage = new InMemoryStorage();
