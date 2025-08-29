import { Article, findChannel, mockChannels } from ".";

type Params = {
  channelId: number;
  article: Article;
};

async function addChannelArticle(params: Params) {
  const channelIdx = findChannel(params.channelId);
  const oldData = mockChannels[channelIdx];

  mockChannels[channelIdx] = {
    ...oldData,
    articles: [...oldData.articles, params.article],
  };
}

export default addChannelArticle;
export type { Params as AddChannelArticleParams };
