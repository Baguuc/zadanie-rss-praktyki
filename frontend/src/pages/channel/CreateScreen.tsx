import ChannelMetadata from "../../features/channel-metadata/ChannelMetadata";
import { useChannels } from "../../hooks/channels";
import Root from "../../layouts/Root";

const ChannelCreateScreen = () => {
  const channels = useChannels();
  const _default = {
    title: "", // The name of the channel.
    link: "", // The URL to the HTML website corresponding to the channel.
    description: "", // 	Phrase or sentence describing the channel.
    language: null, // The language the channel is written in.
    copyright: null, // Copyright notice for content in the channel.
    managingEditor: null, // Email address for person responsible for editorial content.
    webMaster: null, // Email address for person responsible for technical issues relating to channel.
    pubDate: null, // The publication date for the content in the channel.
    lastBuildDate: null, // 	The last time the content of the channel changed.
    category: null // Specify one or more categories that the channel belongs to
  };

  return <Root navbarChildren={<p className="font-bold">Edytor RSS</p>}>
    <div className="flex flex-col gap-[10px] place-items-center place-content-center">
      <h1 className="text-[17px] font-bold p-0 m-0">Stwórz kanał</h1>
      <ChannelMetadata 
        channel={_default}
        button={{
          label: "Stwórz",
          onClick: (channel) => channels.create(channel)
        }}
      />
    </div>
  </Root>
}

export default ChannelCreateScreen;
