import { createLogger, format, transports } from "winston";
import { fullFormat } from "winston-error-format";

const { combine, timestamp, json } = format;
const { Console } = transports;

export const log = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(timestamp(), fullFormat(), json()),
  transports: [new Console()],
});
