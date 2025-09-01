import { Link } from "react-router";
import Button from "../../components/ui/Button";
import ChannelMetadata from "../../features/channel-metadata/ChannelMetadata";
import useChannelId from "../../hooks/channelId";
import { useChannels } from "../../hooks/channels";
import Root from "../../layouts/Root";

function ChannelViewScreen() {
  const channels = useChannels();
  const channelId = useChannelId();

  console.log(channelId);

  if(!channels.find(channelId)) {
    return <Root navbarChildren={<p className="font-bold">Edytor RSS</p>}>
      <h1 className="text-red-500">Nie znaleziono kanału</h1>
    </Root>
  }

  return <Root navbarChildren={<p className="font-bold">{channels.find(channelId)!.title}</p>}>
    <div className="flex flex-col gap-[10px] place-items-center place-content-center">
      <h1 className="text-[17px] font-bold p-0 m-0">Dane kanału</h1>
      <ChannelMetadata 
        channel={channels.find(channelId)!} 
        button={{
          label: "Zapisz",
          onClick: (channel) => { channels.updateMetadata(channelId, channel); alert("Zapisano"); }
        }}
      />
      <Link to={`/channels/${channelId}/articles`} className="w-full"><Button>Wyświetl artykuły</Button></Link>
    </div>
  </Root>
}

export default ChannelViewScreen;
