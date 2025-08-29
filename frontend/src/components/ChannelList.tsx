import { Channel } from "../data/channels";
import ChannelListItem, { ChannelListItemProps } from "./ChannelListItem";

type ChannelListProps = {
  channels: Channel[];
};

type Props = ChannelListProps;

function ChannelList({ channels }: Props) {
  return (
    <ul className="channel-list">
      {channels.map((channel, idx) => (
        <ChannelListItem channel={channel} key={idx} />
      ))}
    </ul>
  );
}

export default ChannelList;
export type { ChannelListProps };
