import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import type TChannelMetadata from "../../models/channel-metadata/type";
import Button from "../../components/ui/Button";

type Props = {
    channel: TChannelMetadata;
    button?: {
        label: string;
        onClick: (channel: TChannelMetadata) => void;
    }
};

const ChannelMetadata = ({ channel, button }: Props) => {
    const [data, setData] = useState(channel);

    useEffect(() => {
        if(typeof data.category === "string") {
            setData(data => { return {
                ...data,
                category: (data.category as unknown as string).split(";").filter(c => c !== "")
            }});
        }
    }, [data]);

    return <div className="flex flex-col gap-[10px]">
        <div className="rounded-[8px] bg-neutral-800 p-[12px] flex flex-col gap-[12px] max-h-[300px] overflow-y-scroll">
            <h1 className="text-[12px] text-white font-bold text-center w-full">Wymagane</h1>
            {createInput("Tytuł", "title", data, setData)}
            {createInput("Link", "link", data, setData)}
            {createInput("Opis", "description", data, setData)}
            <h1 className="text-[12px] text-white font-bold text-center w-full">Opcjonalne</h1>
            {createInput("Język", "language", data, setData)}
            {createInput("Prawa autorskie", "copyright", data, setData)}
            {createInput("Manadżer kanału", "managingEditor", data, setData)}
            {createInput("Web Master", "webMaster", data, setData)}
            {createInput("Kategorie (oddziel ';')", "category", data, setData)}
        </div>
        {button && <Button onClick={() => button.onClick(data)}>{button.label}</Button>}
    </div>
};

const createInput = (placeholder: string, valueToSet: keyof TChannelMetadata, data: TChannelMetadata, setData: React.Dispatch<React.SetStateAction<TChannelMetadata>>) => {
    const defaultValue = data[valueToSet] instanceof Array
        ? data[valueToSet].join(";")
        : data[valueToSet] === null
            ? undefined
            : data[valueToSet];
    
    
    return <Input 
        placeholder={placeholder}
        defaultValue={defaultValue}
        onInput={ev => setData(prev => {
            return {
                ...prev,
                [valueToSet]: (ev.target as any).value
            };
        })}
    />
}

export default ChannelMetadata;