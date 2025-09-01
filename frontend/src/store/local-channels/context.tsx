import {
  createContext
} from "react";
import Channel from "../../models/channel/type"
import ChannelMetadata from "../../models/channel-metadata/type";
import Article from "../../models/article/type";

type ChannelsContext = {
  list: Channel[];
  find: (channelId: number) => Channel | undefined;
  create: (data: ChannelMetadata) => void;
  updateMetadata: (channelId: number, newData: ChannelMetadata) => void;
  addArticle: (channelId: number, article: Article) => void;
};

const ChannelsContext = createContext<ChannelsContext | null>(null);

export { ChannelsContext };