export type LogSource =
  | "express"
  | "server"
  | "router"
  | "storage"
  | "bootstrap";

export function log(message: string, source: LogSource = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  // eslint-disable-next-line no-console -- central logging utility
  console.log(`${formattedTime} [${source}] ${message}`);
}

export function logError(error: unknown, source: LogSource = "server") {
  if (error instanceof Error) {
    log(`${error.name}: ${error.message}`, source);
    if (error.stack) {
      // eslint-disable-next-line no-console -- central logging utility
      console.error(error.stack);
    }
    return;
  }

  log(`Unknown error: ${JSON.stringify(error)}`, source);
}
