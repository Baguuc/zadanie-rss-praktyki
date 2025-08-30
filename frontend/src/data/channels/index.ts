import createChannel, { CreateChannelParams } from "./create";
import listSavedChannels from "./list";
import updateChannelMetadata, {
  UpdateChannelMetadataParams,
} from "./updateMetadata";
import addChannelArticle, { AddChannelArticleParams } from "./addArticle";

type Channel = {
  id: number;
  title: string;
  link: string;
  description: string;
  language: string;
  copyright: string;
  channelManager: string;
  publishedDate: string;
  category: string;
  articles: Article[];
};

type ChannelMetadata = Omit<Omit<Channel, "id">, "articles">;

type Article = {
  title: string;
  link: string;
  description: string;
  author: string;
  category: string;
  commentsLink: string;
  guid: string;
  publishedDate: string;
  source: string;
  content: string;
};

/** getChannelsRepo - function for getting channels repo - an object with all function to interact with saved channels while automatically saving them */
function getChannelsRepo() {
  return {
    createChannel,
    listSavedChannels,
    updateChannelMetadata,
    addChannelArticle,
  };
}

export default getChannelsRepo;
export type {
  Channel,
  ChannelMetadata,
  Article,
  CreateChannelParams,
  UpdateChannelMetadataParams,
  AddChannelArticleParams,
};
