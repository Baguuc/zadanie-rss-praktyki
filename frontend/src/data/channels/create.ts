import { invoke } from "@tauri-apps/api/core";
import { ChannelMetadata } from ".";
import listSavedChannels from "./list";

type Params = {
  data: ChannelMetadata;
};

async function createChannel(params: Params) {
  const data = {
    ...params.data,
    articles: [],
    channel_manager: params.data.channelManager,
    published_date: params.data.publishedDate,
    id: (await listSavedChannels()).length+1
  };
  await invoke('create_channel', { channel: data });

  return data;
}

export default createChannel;
export type { Params as CreateChannelParams };
