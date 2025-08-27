import { leftPad, shortenString } from "../utils/utils";

type ChannelListItemProps = {
    no: number;
    title: string;
    link: string;
    description: string;
};

type Props = ChannelListItemProps;

function ChannelListItem({ no, title, link, description }: Props) {
    const noString = leftPad(no.toString(), 2, "0");
    const descriptionString = shortenString(description, 25);

    return <li>
        <button className="channel-list-item">
            <h3 className="channel-list-item-title">{noString} {title}</h3>
            <p className="channel-list-item-link">{link}</p>
            <p className="channel-list-item-description">{descriptionString}</p>
        </button>
    </li>
}

export default ChannelListItem;
export type { ChannelListItemProps };
