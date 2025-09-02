import { useEffect, useState } from "react";
import BackButton from "../../components/ui/BackButton";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Root from "../../layouts/Root";
import { useChannels } from "../../hooks/channels";

const ChannelSyncScreen = () => {
    const [url, setUrl] = useState<string>("");
    const [status, setStatus] = useState<boolean>(false);
    const channels = useChannels();

    return (<Root navbarChildren={[<BackButton />, <p className="font-bold">Edytor RSS</p>]}>
        <div className="flex flex-col gap-[10px] place-items-center place-content-center">
            <h1 className="text-[17px] font-bold p-0 m-0">Wyślij kanały na serwer</h1>
            <p className="text-[12px] font-bold p-0 m-0">Status serwera: {status ? "online" : "offline"}</p>
            <div className="p-[12px] gap-[12px] rounded-[8px] flex flex-col bg-neutral-800">
                <Input placeholder="Link do serwera" defaultValue="..." onInput={(ev) => setUrl((ev.target as any).value)} />
            </div>
            <Button onClick={() => {
                channels.sync(url, () => { alert("Wysłano kanały na serwer"); setStatus(true); }, () => { alert("Serwer jest offline!"); setStatus(false); })
            }}>Wyślij</Button>
        </div>
    </Root>);
}

export default ChannelSyncScreen;