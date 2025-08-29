import { Channel, ChannelMetadata, mockChannels } from ".";

type Params = {
  data: ChannelMetadata;
};

async function createChannel(params: Params) {
  const data: Channel = {
    ...params.data,
    id: mockChannels[mockChannels.length - 1].id + 1,
    articles: [],
  };
  mockChannels.push(data);

  return data;
}

export default createChannel;
export type { Params as CreateChannelParams };
