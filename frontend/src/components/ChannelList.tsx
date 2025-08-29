import ChannelListItem, { ChannelListItemProps } from "./ChannelListItem";

type ChannelListProps = {
    channels: Omit<ChannelListItemProps, 'no'>[]
};

type Props = ChannelListProps;

function ChannelList({ channels }: Props) {
    return <ul className="channel-list">
        {channels.map((channel, idx) => <ChannelListItem
            id={channel.id}
            title={channel.title}
            link={channel.link}
            description={channel.description}
            key={idx}
        />)}
    </ul>
}

export default ChannelList;
export type { ChannelListProps };
