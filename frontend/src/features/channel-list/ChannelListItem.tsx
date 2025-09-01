import { Link } from "react-router";
import Channel from "../../models/channel/type";

type Props = {
    channel: Channel
};

const ChannelListItem = ({ channel }: Props) => {
    return <Link to={`/channels/${channel.id}`}><div className="w-full h-fit text-white text-center bg-neutral-700 p-[10px] gap-[10px] rounded-[4px] min-w-[200px]">{channel.title}</div></Link>
}

export default ChannelListItem;