import { useState, useEffect } from "react";
import { useParams } from "react-router";

function useChannelId() {
  const params = useParams();
  const [channelId, setChannelId] = useState(-1);

  useEffect(() => {
    console.log(params.channelId || "");
    const id = parseInt(params.channelId || "");

    if (!id) {
      return;
    }

    setChannelId(id);
  }, []);

  return channelId;
}

export default useChannelId;
