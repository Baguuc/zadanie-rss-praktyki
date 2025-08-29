import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import getChannelsRepo, {
  AddChannelArticleParams,
  Channel,
  CreateChannelParams,
  UpdateChannelMetadataParams,
} from "../data/channels";

type ChannelsContext = {
  list: Channel[];
  find: (channelId: number) => Channel | undefined;
  create: (params: CreateChannelParams) => void;
  updateMetadata: (params: UpdateChannelMetadataParams) => void;
  addArticle: (params: AddChannelArticleParams) => void;
};

const ChannelsContext = createContext<ChannelsContext | null>(null);

const ChannelsProvider = ({ children }: PropsWithChildren<{}>) => {
  const channelsRepo = getChannelsRepo();

  const [channels, setChannels] = useState<Channel[]>([]);
  const refreshAll = () => {
    channelsRepo.listSavedChannels().then(setChannels);
  };

  useEffect(refreshAll, []);

  const find = (channelId: number) => {
    return channels.find((channel) => channel.id === channelId);
  };

  const create = (params: CreateChannelParams) => {
    channelsRepo.createChannel(params).then(refreshAll);
  };

  const updateMetadata = (params: UpdateChannelMetadataParams) => {
    channelsRepo.updateChannelMetadata(params).then(refreshAll);
  };

  const addArticle = (params: AddChannelArticleParams) => {
    channelsRepo.addChannelArticle(params).then(refreshAll);
  };

  const contextValue = {
    list: channels,
    find,
    create,
    updateMetadata,
    addArticle,
  };

  return (
    <ChannelsContext.Provider value={contextValue}>
      {children}
    </ChannelsContext.Provider>
  );
};

const useChannels = () => {
  const context = useContext(ChannelsContext);

  if (!context) {
    throw new Error("useChannels must be used within a ChannelProvider");
  }

  return context;
};

export { ChannelsProvider, useChannels };
