import Channel from "../channel/type";

type ChannelMetadata = Omit<Omit<Channel, "id">, "articles">;

export default ChannelMetadata;