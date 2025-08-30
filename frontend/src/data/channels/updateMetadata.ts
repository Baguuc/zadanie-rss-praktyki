import { invoke } from "@tauri-apps/api/core";
import { ChannelMetadata } from ".";

type Params = {
  channelId: number;
  new: ChannelMetadata;
};

async function updateChannelMetadata(params: Params) {
  await invoke("update_channel", { 
    id: params.channelId, 
    newMetadata: params.new
  });
}

export default updateChannelMetadata;
export type { Params as UpdateChannelMetadataParams };
