import {
  useContext
} from "react";
import { ChannelsContext } from "../store/local-channels/context";

const useChannels = () => {
  const context = useContext(ChannelsContext);

  if (!context) {
    throw new Error("useChannels must be used within a ChannelProvider");
  }

  return context;
};

export { useChannels };
