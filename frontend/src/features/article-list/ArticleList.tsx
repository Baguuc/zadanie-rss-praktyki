import { useEffect, useState } from "react";
import Article from "../../models/article/type";
import ArticleListItem from "./ArticleListItem";
import Button from "../../components/ui/Button";
import { useChannels } from "../../hooks/channels";
import useChannelId from "../../hooks/channelId";

const ArticleList = () => {
    const channels = useChannels();
    const channelId = useChannelId();
    const [data, setData] = useState<Article[]>((channels.find(channelId) ?? { articles: [] }).articles);

    useEffect(() => {
        console.log({ ...data });
    }, [data]);

    if(channelId === -1) {
        return <h1 className="text-red-500">Nie znaleziono kanału</h1>
    }
    
    return <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px] max-h-[300px] overflow-y-scroll">
            {data.map((article: Article, idx: number) => (
                <ArticleListItem
                    article={article}
                    onInput={(updatedArticle) => {
                        // Create a new array with the updated article
                        const newData = data.map((item, index) => 
                            index === idx ? updatedArticle : item
                        );
                        setData(newData);
                    }}
                    key={idx}
                />
            ))}
        </div>
        <Button onClick={() => {
            setData([...data, { 
                title: "", 
                description: "", 
                link: "", 
                author: "", 
                category: [], 
                comments: "", 
                pubDate: "" 
            }]);
        }}>Dodaj</Button>
        <Button onClick={() => {
            channels.updateArticles(channelId, data);
        }}>Zapisz</Button>
    </div>
};

export default ArticleList;