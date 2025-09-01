import {
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { ChannelsContext } from "./context";
import Channel from "../../models/channel/type";
import ChannelMetadata from "../../models/channel-metadata/type";
import Article from "../../models/article/type";
import channelsRepo from "../../services/local-channels/api";

const ChannelsProvider = ({ children }: PropsWithChildren<{}>) => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const refreshAll = () => {
    channelsRepo.list().then(setChannels);
  };
  const refreshAfter = (promise: Promise<any>) => promise.then(refreshAll);

  useEffect(refreshAll, []);

  const contextValue = {
    list: channels,

    find: (channelId: number) => channels.find((channel) => channel.id === channelId),

    create: (data: ChannelMetadata) => refreshAfter(channelsRepo.create(data)),
    
    updateMetadata: (channelId: number, newData: ChannelMetadata) => refreshAfter(channelsRepo.updateMetadata(channelId, newData)),
    
    addArticle: (channelId: number, article: Article) => refreshAfter(channelsRepo.addArticle(channelId, article))
  };
  
  return (
    <ChannelsContext.Provider value={contextValue}>
      {children}
    </ChannelsContext.Provider>
  );
};

export { ChannelsProvider };