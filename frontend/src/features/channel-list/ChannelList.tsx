import { Link } from "react-router";
import Button from "../../components/ui/Button";
import { useChannels } from "../../hooks/channels";
import Channel from "../../models/channel/type";
import ChannelListItem from "./ChannelListItem";

const displayChannelItem = (channel: Channel) => <ChannelListItem channel={channel} />

const ChannelList = () => {
    const channels = useChannels();

    return <div className="rounded-[8px] bg-neutral-800 p-[12px] flex flex-col gap-[12px] max-h-[300px]">
        <div className="flex flex-col gap-[12px] max-h-[300px] overflow-y-scroll">{channels.list.map(displayChannelItem)}</div>
        <Link to="/channels/create"><Button outlined={true}>Stwórz</Button></Link> 
    </div>
}

export default ChannelList;