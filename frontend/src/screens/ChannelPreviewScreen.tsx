import Button from "../components/Button";
import ChannelArticle from "../components/ChannelArticleTable";
import ChannelAvaibleIndicator from "../components/ChannelAvaibleIndicator";
import ChannelMetadata from "../components/ChannelMetadata";
import ChannelUpdatedIndicator from "../components/ChannelUpdatedIndicator";
import ButtonLink from "../components/ButtonLink";
import { Suspense, useEffect, useState } from "react";
import { Channel } from "../data/channels";
import { useChannels } from "../hooks/channels";
import useChannelId from "../hooks/channelId";
import LoadingIndicator from "../components/LoadingIndicator";

function ChannelPreviewScreen() {
  const [channelData, setChannelData] = useState<Channel>({
    id: 0,
    category: "",
    channelManager: "",
    copyright: "",
    description: "",
    language: "",
    link: "",
    publishedDate: "",
    title: "",
    articles: [],
  });
  const channels = useChannels();
  const channelId = useChannelId();

  useEffect(() => {
    const channelData = channels.find(channelId);
    
    if (!!channelData) {
      setChannelData(channelData);
    }
  }, [channelId]);

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <div className="channel-preview-screen">
        <div className="navbar">
          <ButtonLink style={{ height: "auto" }} to="/channels">
            Wróć
          </ButtonLink>
          <ChannelMetadata channel={channelData} />
          <ButtonLink
            style={{ height: "auto" }}
            to={`/channels/${channelId}/edit`}
          >
            Edytuj
          </ButtonLink>
          <Button style={{ height: "auto" }}>Wyślij</Button>
          <div className="navbar-right">
            <div className="channel-indicators">
              <ChannelUpdatedIndicator updated={true} />
              <ChannelAvaibleIndicator updated={false} />
            </div>
          </div>
        </div>
        <main className="channel-articles">
          <h1>Artykuły kanału</h1>
          <ul className="channel-articles-list">
            {channelData.articles.map((article) => (
              <li>
                <ChannelArticle article={article} />
              </li>
            ))}
            <li>
              <ButtonLink
                style={{
                  width: "calc(100% - 20px)",
                  height: "100%",
                  textAlign: "center",
                }}
                to={`/channels/${channelId}/items/add`}
              >
                +
              </ButtonLink>
            </li>
          </ul>
        </main>
      </div>
    </Suspense>
  );
}

export default ChannelPreviewScreen;
