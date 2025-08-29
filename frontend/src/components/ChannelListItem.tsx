import { Link, redirect } from "react-router";
import { leftPad, shortenString } from "../utils/utils";

type ChannelListItemProps = {
    id: number;
    title: string;
    link: string;
    description: string;
};

type Props = ChannelListItemProps;

function ChannelListItem({ id, title, link, description }: Props) {
    const noString = leftPad(id.toString(), 2, "0");
    const descriptionString = shortenString(description, 25);

    return <li>
        <Link to={`/channels/${id}`} className="channel-list-item">
            <h3 className="channel-list-item-title">{noString} {title}</h3>
            <p className="channel-list-item-link">{link}</p>
            <p className="channel-list-item-description">{descriptionString}</p>
        </Link>
    </li>
}

export default ChannelListItem;
export type { ChannelListItemProps };
