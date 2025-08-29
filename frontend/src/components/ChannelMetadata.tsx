import { Channel } from "../data/channels";
import { leftPad } from "../utils/utils";

type ChannelMetadataProps = {
    channel: Channel
};

type Props = ChannelMetadataProps;

function ChannelMetadata({ channel }: Props) {
    const idString = leftPad(channel.id.toString(), 2, "0");

    return <div className="channel-metadata">
        <h3 className="channel-metadata-title">{idString} {channel.title}</h3>
        <p className="channel-metadata-link">{channel.link}</p>
        <p className="channel-metadata-description">{channel.description}</p>
    </div>
}

export default ChannelMetadata;
export type { ChannelMetadataProps as ChannelListItemProps };
