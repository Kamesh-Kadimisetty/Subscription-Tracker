import { Client } from "@upstash/workflow";
import { QSTASH_TOKEN, QSTASH_URL } from "./env.js";

export const workflowClient = new Client({
  token: QSTASH_TOKEN || "eyJVc2VySUQiOiJkZWZhdWx0VXNlciIsIlBhc3N3b3JkIjoiZGVmYXVsdFBhc3N3b3JkIn0=",
  baseUrl: QSTASH_URL || "http://127.0.0.1:8080"
});