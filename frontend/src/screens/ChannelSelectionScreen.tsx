import ChannelList from "../components/ChannelList";
import ButtonLink from "../components/ButtonLink";
import { useChannels } from "../hooks/channels";

function ChannelSelectionScreen() {
  const channels = useChannels();

  return (
    <div className="channel-selection-screen">
      <h1 className="channel-selection-screen-title">Wybierz Kanał</h1>
      <ChannelList channels={channels.list} />
      <ButtonLink to="/channels/create">Dodaj kanał</ButtonLink>
      <ButtonLink to="/channels/check">Sprawdź poprawność kanału</ButtonLink>
    </div>
  );
}

export default ChannelSelectionScreen;
