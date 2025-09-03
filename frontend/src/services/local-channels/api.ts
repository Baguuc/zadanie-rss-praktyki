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

const sync = async (url: string, ) => {
    for(let channel of await list()) {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      
      const res = await fetch(`${url}/channels/${channel.id}`, {
        headers,
        method: "POST",
        body: JSON.stringify(channel)
      });

      console.log(res.status);

      if(!res.ok) {
        return Promise.reject("server offline")
      }
    }
}

const checkCompliance = async (url: string) => {
    const response = await fetch(url);
    const text = await response.text();
    console.log(url, text);
    const isCompliant = await invoke("check_compliance", { channelString: text });

    return isCompliant as boolean;
}

const channelsRepo = {
    create,
    list,
    updateMetadata,
    updateArticles,
    sync,
    checkCompliance
};

export default channelsRepo;