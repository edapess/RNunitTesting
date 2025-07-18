// setupLogger.ts
let socket: WebSocket | null = null;

export function initRemoteLogger(wsUrl: string) {
  socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    console.info("[RemoteLogger] Connected to", wsUrl);
  };

  socket.onerror = (e) => {
    console.warn("[RemoteLogger] Socket error", e);
  };

  const original = {
    log: console.log,
    warn: console.warn,
    error: console.error,
    info: console.info,
  };

  const wrap = (level: keyof typeof original) => {
    return (...args: any[]) => {
      // Call original console first
      original[level](...args);

      try {
        const payload = {
          source: "console",
          level,
          message: args
            .map((a) => (typeof a === "string" ? a : JSON.stringify(a)))
            .join(" "),
          timestamp: Date.now(),
        };

        if (socket?.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(payload));
        }
      } catch (e) {
        original.warn("[RemoteLogger] Failed to send log", e);
      }
    };
  };

  console.log = wrap("log");
  console.warn = wrap("warn");
  console.error = wrap("error");
  console.info = wrap("info");
}
