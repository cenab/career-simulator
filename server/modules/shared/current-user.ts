import { storage } from "../../storage";
import { UnauthorizedError } from "../../lib/errors";

export async function resolveCurrentUser() {
  const [user] = await storage.users.all();
  if (!user) {
    throw new UnauthorizedError("No authenticated user in demo mode");
  }

  return user;
}
