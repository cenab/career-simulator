import { createServer } from "http";
import { createApp } from "./app";
import { setupVite, serveStatic } from "./vite";
import { log } from "./lib/logger";

async function bootstrap() {
  const app = createApp();
  const server = createServer(app);

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number.parseInt(process.env.PORT ?? "5000", 10);

  return new Promise<void>((resolve) => {
    server.listen(
      {
        port,
        host: "0.0.0.0",
        reusePort: true,
      },
      () => {
        log(`Serving on port ${port}`, "bootstrap");
        resolve();
      },
    );
  });
}

void bootstrap().catch((error) => {
  log(`Failed to start server: ${(error as Error).message}`, "server");
  process.exit(1);
});
