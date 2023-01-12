import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LivePeerClient = createReactClient({
  provider: studioProvider({ apiKey: "6d912fcf-4e57-440e-901c-d814041332a1" }),
});

export default LivePeerClient;
