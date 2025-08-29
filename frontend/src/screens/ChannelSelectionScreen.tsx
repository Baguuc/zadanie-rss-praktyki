import ChannelList from "../components/ChannelList";
import ButtonLink from "../components/ButtonLink";

const mockChannels = [
  { id: 1, title: "Kanał 1", link: "https://www.kanal1.org/", description: "Lorem ipsum dolor sit amet.  Quo maiores facere" },
  { id: 2, title: "Kanał 2", link: "https://www.kanal2.org/", description: "Lorem ipsum dolor sit amet.  Quo maiores facere" },
  { id: 3, title: "Kanał 3", link: "https://www.kanal3.org/", description: "Lorem ipsum dolor sit amet.  Quo maiores facere" }
];

function ChannelSelectionScreen() {
  return <div className="channel-selection-screen">
    <h1 className="channel-selection-screen-title">Wybierz Kanał</h1>
    <ChannelList channels={mockChannels} />
    <ButtonLink to="/channels/create">Dodaj kanał</ButtonLink>
    <ButtonLink to="/channels/check">Sprawdź poprawność kanału</ButtonLink>
  </div>
}

export default ChannelSelectionScreen;
