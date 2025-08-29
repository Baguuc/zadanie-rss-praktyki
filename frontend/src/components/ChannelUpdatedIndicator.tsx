type ChannelUpdatedIndicatorProps = {
  updated: boolean;
};

type Props = ChannelUpdatedIndicatorProps;

function ChannelUpdatedIndicator({ updated }: Props) {
  const label = updated
    ? "Kanał zdalny zaktualizowany"
    : "Kanał zdalny niezaktualizowany";
  const extraClass = updated ? "true" : "false";

  return <p className={`channel-updated-indicator ${extraClass}`}>{label}</p>;
}

export default ChannelUpdatedIndicator;
export type { ChannelUpdatedIndicatorProps };
