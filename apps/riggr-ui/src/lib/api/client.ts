import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { AgentService } from "./proto";

const defaultBaseUrl = "http://127.0.0.1:50051";
const agentBaseUrl = import.meta.env.VITE_AGENT_URL ?? defaultBaseUrl;

const transport = createConnectTransport({
  baseUrl: agentBaseUrl,
});

export const agentClient = createPromiseClient(AgentService, transport);
export const agentEndpoint = agentBaseUrl;
