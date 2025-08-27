type ChannelAvaibleIndicatorProps = {
    updated: boolean;
};

type Props = ChannelAvaibleIndicatorProps;

function ChannelAvaibleIndicator({ updated }: Props) {
    const label = updated
        ? "Kanał dostępny"
        : "Kanał niedostępny";
    const extraClass = updated 
        ? "true"
        : "false";
    
    return <p className={`channel-avaible-indicator ${extraClass}`}>{label}</p>
}

export default ChannelAvaibleIndicator;
export type { ChannelAvaibleIndicatorProps };