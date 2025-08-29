import ChannelList from "../components/ChannelList";
import ButtonLink from "../components/ButtonLink";
import { useEffect, useState } from "react";
import { Channel, getChannels } from "../data/channels";

function ChannelSelectionScreen() {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    getChannels().then(setChannels);
  }, []);

  return <div className="channel-selection-screen">
    <h1 className="channel-selection-screen-title">Wybierz Kanał</h1>
    <ChannelList channels={channels} />
    <ButtonLink to="/channels/create">Dodaj kanał</ButtonLink>
    <ButtonLink to="/channels/check">Sprawdź poprawność kanału</ButtonLink>
  </div>
}

export default ChannelSelectionScreen;
