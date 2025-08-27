import { leftPad } from "../utils/utils";

type ChannelMetadataProps = {
    no: number;
    title: string;
    link: string;
    description: string;
};

type Props = ChannelMetadataProps;

function ChannelMetadata({ no, title, link, description }: Props) {
    const noString = leftPad(no.toString(), 2, "0");

    return <div className="channel-metadata">
        <h3 className="channel-metadata-title">{noString} {title}</h3>
        <p className="channel-metadata-link">{link}</p>
        <p className="channel-metadata-description">{description}</p>
    </div>
}

export default ChannelMetadata;
export type { ChannelMetadataProps as ChannelListItemProps };
