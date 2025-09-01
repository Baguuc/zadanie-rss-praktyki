import Article from "../article/type";

type Channel = {
  id: number; // id (editor internal, doesn't take effect when saved as a channel)
  title: string; // The name of the channel.
  link: string; // The URL to the HTML website corresponding to the channel.
  description: string; // 	Phrase or sentence describing the channel.
  language: string | null; // The language the channel is written in.
  copyright: string | null; // Copyright notice for content in the channel.
  managingEditor: string | null; // Email address for person responsible for editorial content.
  webMaster: string | null; // Email address for person responsible for technical issues relating to channel.
  pubDate: string | null; // The publication date for the content in the channel.
  lastBuildDate: string | null; // 	The last time the content of the channel changed.
  category: string[] | null; // Specify one or more categories that the channel belongs to.
  articles: Article[]; // list of articles
};

export default Channel;