import { Link } from "react-router";
import Button from "../../components/ui/Button";
import useChannelId from "../../hooks/channelId";
import { useChannels } from "../../hooks/channels";
import Root from "../../layouts/Root";
import BackButton from "../../components/ui/BackButton";
import { useEffect, useState } from "react";
import TChannelMetadata from "../../models/channel-metadata/type";
import ChannelMetadata from "../../features/channel-metadata/ChannelMetadata";

function ChannelViewScreen() {
  const channels = useChannels();
  const channelId = useChannelId();
  const [channelMetadata, setChannelMetadata] = useState<TChannelMetadata | undefined>(undefined);
  
  useEffect(() => {
    const channel = channels.find(channelId);
    if(!channel) return;
        
    setChannelMetadata(channel);
  }, [channelId]);

  if(!channelMetadata) {
    return <h1 className="text-red-500">Nie znaleziono kanału</h1>
  }

  return <Root navbarChildren={[<BackButton />, <p className="font-bold">{channels.find(channelId)?.title}</p>]}>
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
