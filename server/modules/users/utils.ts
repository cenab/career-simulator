import type { User } from "@shared/schema";

export type PublicUser = Omit<User, "passwordHash">;

export const toPublicUser = (user: User): PublicUser => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- explicit omit for clarity
  const { passwordHash, ...rest } = user;
  return rest;
};
