import { invoke } from "@tauri-apps/api/core";
import Article from "../../models/article/type";
import ChannelMetadata from "../../models/channel-metadata/type";
import Channel from "../../models/channel/type";

const create = async (data: ChannelMetadata) => {
  const channel = {
    ...data,
    articles: [],
    id: (await list()).length+1
  };
  await invoke('create_channel', { channel });

  return data;
}

const list = async () => await invoke("list_channels") as Channel[];

const updateMetadata = async (channelId: number, newData: ChannelMetadata) => await invoke("update_channel", { id: channelId, newMetadata: newData });

const updateArticles = async (channelId: number, articles: Article[]) => await invoke('update_articles', { id: channelId, newArticles: articles });

const channelsRepo = {
    create,
    list,
    updateMetadata,
    updateArticles
};

export default channelsRepo;