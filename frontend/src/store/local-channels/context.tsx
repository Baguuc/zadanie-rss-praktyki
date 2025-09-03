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
  updateArticles: (channelId: number, article: Article[]) => void;
  sync: (url: string, onSuccess: () => void, onFail: () => void) => void;
  checkCompliance: (url: string, onCompliance: () => void, onNonCompliance: () => void) => void;
};

const ChannelsContext = createContext<ChannelsContext | null>(null);

export { ChannelsContext };