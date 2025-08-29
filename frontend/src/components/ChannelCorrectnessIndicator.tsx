type ChannelCorrectnessIndicatorProps =
  | {
      fetched: false;
    }
  | {
      fetched: true;
      correct: boolean;
    };

type Props = ChannelCorrectnessIndicatorProps;

function ChannelCorrectnessIndicator(props: Props) {
  if (!props.fetched)
    return (
      <p
        style={{
          fontFamily: "JetBrains Mono",
          fontSize: "21px",
          fontWeight: "bold",
          color: "var(--clr-fg1)",
        }}
      >
        ---
      </p>
    );

  if (props.correct)
    return <p className="channel-correctness-indicator">---</p>;
}

export default ChannelCorrectnessIndicator;
