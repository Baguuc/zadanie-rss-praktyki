import { useEffect, useState } from "react";
import Input from "../../components/ui/Input";
import Article from "../../models/article/type";

type Props = {
    article: Article;
    onInput?: (article: Article) => void;
};

const ArticleListItem = ({ article, onInput }: Props) => {
    const [data, setData] = useState(article);

    useEffect(() => {
        if(typeof data.category === "string") {
            setData(data => { return {
                ...data,
                category: (data.category as unknown as string).split(";").filter(c => c !== "")
            }});
        }

        if(onInput) onInput(data);
    }, [data]);

    return <div className="rounded-[8px] bg-neutral-800 p-[12px] flex flex-col gap-[12px]">
        <h1 className="text-[12px] text-white font-bold text-center w-full">Wymagane</h1>
        {createInput("Tytuł", "title", data, setData)}
        {createInput("Link", "link", data, setData)}
        {createInput("Opis", "description", data, setData)}
        <h1 className="text-[12px] text-white font-bold text-center w-full">Opcjonalne</h1>
        {createInput("Autor", "author", data, setData)}
        {createInput("Link do komentarzy", "comments", data, setData)}
        {createInput("Kategorie (oddziel ';')", "category", data, setData)}
    </div>
};

const createInput = (placeholder: string, valueToSet: keyof Article, data: Article, setData: React.Dispatch<React.SetStateAction<Article>>) => {
    const value = data[valueToSet];
    const defaultValue = value instanceof Array
        ? value.join(";")
        : value instanceof Date
            ? value.toISOString()
            : value === null
                ? undefined
                : value;
    
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

export default ArticleListItem;