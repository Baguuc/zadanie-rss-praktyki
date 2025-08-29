import { Link } from "react-router";
import { leftPad, shortenString } from "../utils/utils";
import { Channel } from "../data/channels";

type ChannelListItemProps = {
  channel: Channel;
};

type Props = ChannelListItemProps;

function ChannelListItem({ channel }: Props) {
  const noString = leftPad(channel.id.toString(), 2, "0");
  const descriptionString = shortenString(channel.description, 25);

  return (
    <li>
      <Link to={`/channels/${channel.id}`} className="channel-list-item">
        <h3 className="channel-list-item-title">
          {noString} {channel.title}
        </h3>
        <p className="channel-list-item-link">{channel.link}</p>
        <p className="channel-list-item-description">{descriptionString}</p>
      </Link>
    </li>
  );
}

export default ChannelListItem;
export type { ChannelListItemProps };
