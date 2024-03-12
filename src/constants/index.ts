import { USER_AGENTS, type Agents } from "./agents/Agents.Constants";
import { YoutubeSessionKeySecret as sessionSecretKey } from "./secrets/youtubeSessionKey.Secrets";

namespace Constants {
  export const Agents: Agents = USER_AGENTS as Agents;
  export const YoutubeSessionKeySecret: string = sessionSecretKey.toString();
}

export default Constants;
