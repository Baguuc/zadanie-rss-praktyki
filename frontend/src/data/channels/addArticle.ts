import { invoke } from "@tauri-apps/api/core";
import { Article } from ".";

type Params = {
  channelId: number;
  article: Article;
};

async function addChannelArticle(params: Params) {
  await invoke('add_article', { 
    id: params.channelId,
    article: params.article
  });
}

export default addChannelArticle;
export type { Params as AddChannelArticleParams };
