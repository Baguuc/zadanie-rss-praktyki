import Button from "../components/Button";
import ChannelList from "../components/ChannelList";

const mockChannels = [
  { title: "Kanał 1", link: "https://www.kanal1.org/", description: "Lorem ipsum dolor sit amet.  Quo maiores facere" },
  { title: "Kanał 2", link: "https://www.kanal2.org/", description: "Lorem ipsum dolor sit amet.  Quo maiores facere" },
  { title: "Kanał 3", link: "https://www.kanal3.org/", description: "Lorem ipsum dolor sit amet.  Quo maiores facere" }
];

function ChannelSelectionScreen() {
  return <div className="channel-selection-screen">
    <h1 className="channel-selection-screen-title">Wybierz Kanał</h1>
    <ChannelList channels={mockChannels} />
    <Button>Sprawdź poprawność kanału</Button>
  </div>
}

export default ChannelSelectionScreen;
