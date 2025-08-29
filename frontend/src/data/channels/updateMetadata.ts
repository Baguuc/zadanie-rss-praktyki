import { ChannelMetadata, findChannel, mockChannels } from ".";

type Params = {
  channelId: number;
  new: ChannelMetadata;
};

async function updateChannelMetadata(params: Params) {
  const channelIdx = findChannel(params.channelId);
  const oldData = mockChannels[channelIdx];
  mockChannels[channelIdx] = {
    ...oldData,
    ...params.new,
  };

  return mockChannels[channelIdx];
}

export default updateChannelMetadata;
export type { Params as UpdateChannelMetadataParams };
