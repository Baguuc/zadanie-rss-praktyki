import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import ChannelArticle from "../components/ChannelArticleTable";
import ChannelAvaibleIndicator from "../components/ChannelAvaibleIndicator";
import ChannelMetadata from "../components/ChannelMetadata";
import ChannelUpdatedIndicator from "../components/ChannelUpdatedIndicator";
import ButtonLink from "../components/ButtonLink";
import { useEffect, useState } from "react";
import { Channel, getChannel } from "../data/channels";

function ChannelPreviewScreen() {
  const navigate = useNavigate();
  const { channelId } = useParams();

  const [ channel, setChannel ] = useState<Channel | null>(null);

  useEffect(() => {
    const id = parseInt(channelId || "");

    if(!id) {
      navigate("/channels")
    }

    getChannel(id).then(setChannel);
  }, []);

  useEffect(() => { console.log(channel) }, [channel]);

  if(channel === null) {
    return <div className="channel-preview-screen" />
  } else {
    return <div className="channel-preview-screen">
      <div className="navbar">
          <ButtonLink style={{ height: "auto" }} to="/channels">Wróć</ButtonLink>
          <ChannelMetadata channel={channel} />
          <ButtonLink style={{ height: "auto" }} to={`/channels/${channelId}/edit`}>Edytuj</ButtonLink>
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
              {channel.articles.map(article => <li><ChannelArticle article={article} /></li>)}
              <li><ButtonLink style={{ width: "calc(100% - 20px)", height: "100%", textAlign: "center" }} to={`/channels/${channelId}/items/add`}>+</ButtonLink></li>
          </ul>
      </main>
    </div>
  }
}

export default ChannelPreviewScreen;
