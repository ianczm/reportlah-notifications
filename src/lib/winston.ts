import { createLogger, format, transports } from "winston";

const { combine, timestamp, json } = format;
const { Console } = transports;

export const log = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), json()),
  transports: [new Console()],
});
