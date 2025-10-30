export const API_ROUTES = {
  auth: {
    signup: "/api/auth/signup",
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    session: "/api/auth/session",
    resetRequest: "/api/auth/password/reset-request",
    reset: "/api/auth/password/reset",
  },
  me: {
    root: "/api/me",
    activity: "/api/me/activity",
    preferences: "/api/me/preferences",
    characters: "/api/characters/me",
    scenes: "/api/scenes/me",
    chats: (scope: "recent" | "pinned" = "recent") =>
      `/api/chats/me?scope=${scope}`,
  },
  users: {
    detail: (userId: string) => `/api/users/${userId}`,
  },
  characters: {
    list: (params?: string) => `/api/characters${params ? `?${params}` : ""}`,
    detail: (id: string) => `/api/characters/${id}`,
    publish: (id: string) => `/api/characters/${id}/publish`,
  },
  scenes: {
    list: (params?: string) => `/api/scenes${params ? `?${params}` : ""}`,
    detail: (id: string) => `/api/scenes/${id}`,
    publish: (id: string) => `/api/scenes/${id}/publish`,
  },
  chats: {
    root: "/api/chats",
    detail: (chatId: string) => `/api/chats/${chatId}`,
    messages: (chatId: string) => `/api/chats/${chatId}/messages`,
    latest: (chatId: string) => `/api/chats/${chatId}/messages/latest`,
    feedback: (chatId: string, messageId: string) =>
      `/api/chats/${chatId}/messages/${messageId}/feedback`,
    pin: (chatId: string) => `/api/chats/${chatId}/pin`,
    analysis: (chatId: string) => `/api/chats/${chatId}/analysis`,
    voice: (chatId: string) => `/api/chats/${chatId}/voice`,
  },
  discover: {
    overview: "/api/discover/overview",
  },
  search: {
    root: (query: string) => `/api/search?q=${encodeURIComponent(query)}`,
    suggestions: (query: string) =>
      `/api/search/suggestions?q=${encodeURIComponent(query)}`,
  },
  metadata: {
    tags: (type?: "scene" | "character") =>
      `/api/tags${type ? `?type=${type}` : ""}`,
    collections: "/api/collections",
    trending: "/api/trending",
    chatOptions: "/api/chat/options",
  },
  uploads: {
    root: "/api/uploads",
  },
} as const;
