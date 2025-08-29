import { useState, useEffect } from "react";
import { useParams } from "react-router";

function useChannelId() {
  const { channelId: _channelId } = useParams();
  const [channelId, setChannelId] = useState(-1);

  useEffect(() => {
    const id = parseInt(_channelId || "");

    if (!id) {
      return;
    }

    setChannelId(id);
  }, []);

  return channelId;
}

export default useChannelId;
