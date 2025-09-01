import ArticleList from "../../features/article-list/ArticleList";
import useChannelId from "../../hooks/channelId";
import { useChannels } from "../../hooks/channels";
import Root from "../../layouts/Root";

function ArticlesListScreen() {
  const channels = useChannels();
  const channelId = useChannelId();

  if(!channels.find(channelId)) {
    return <Root navbarChildren={<p className="font-bold">Edytor RSS</p>}>
      <h1 className="text-red-500">Nie znaleziono kanału</h1>
    </Root>
  }

  return <Root navbarChildren={<p className="font-bold">{channels.find(channelId)?.title}</p>}>
    <div className="flex flex-col gap-[10px] place-items-center place-content-center">
      <h1 className="text-[17px] font-bold p-0 m-0">Artykuły</h1>
      <ArticleList />
    </div>
  </Root>
}

export default ArticlesListScreen;
