import { createHash, timingSafeEqual } from "node:crypto";

export function hashPassword(password: string): string {
  return createHash("sha256").update(password).digest("hex");
}

export function verifyPassword(password: string, hash: string): boolean {
  const hashedBuffer = Buffer.from(hash, "hex");
  const candidateBuffer = Buffer.from(hashPassword(password), "hex");

  if (hashedBuffer.length !== candidateBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateBuffer, hashedBuffer);
}
