import Article from "../article/type";

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

export default Channel;