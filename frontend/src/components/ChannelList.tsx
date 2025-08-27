import ChannelListItem, { ChannelListItemProps } from "./ChannelListItem";

type ChannelListProps = {
    channels: Omit<ChannelListItemProps, 'no'>[]
};

type Props = ChannelListProps;

function ChannelList({ channels }: Props) {
    return <li className="channel-list">
        {channels.map((channel, idx) => <ChannelListItem
            no={idx+1}
            title={channel.title}
            link={channel.link}
            description={channel.description}
            key={idx+1}
        />)}
    </li>
}

export default ChannelList;
export type { ChannelListProps };
