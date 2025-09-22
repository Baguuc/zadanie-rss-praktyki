import {  useEffect, useState } from "react";
import ArticleListItem from "./ArticleListItem";
import Button from "../../components/ui/Button";
import { useChannels } from "../../hooks/channels";
import useChannelId from "../../hooks/channelId";
import Article from "../../models/article/type";

const ArticleList = () => {
    const channels = useChannels();
    const channelId = useChannelId();
    const [articles, setArticles] = useState<Article[] | null>(null);

    useEffect(() => {
        const channel = channels.find(channelId);
        if(!channel) return;
        
        setArticles(channel.articles);
    }, [channelId]);

    if(!articles) {
        return <h1 className="text-red-500">Nie znaleziono kanału</h1>
    }
    
    return <div className="flex flex-col gap-[10px]">
        <div className="flex flex-col gap-[10px] max-h-[300px] overflow-y-scroll">
            {articles.map((article: Article, idx: number) => (
                <ArticleListItem
                    article={article}
                    onInput={(updatedArticle) => {
                        // Create a new array with the updated article
                        const newData = articles.map((item, index) => 
                            index === idx ? updatedArticle : item
                        );
                        setArticles(newData);
                    }}
                    key={idx}
                />
            ))}
        </div>
        <Button onClick={() => {
            setArticles([...articles, { 
                title: "", 
                description: "", 
                link: "", 
                pubDate: new Date(),
                author: "", 
                category: [], 
                comments: ""
            }]);
        }}>Dodaj</Button>
        <Button onClick={() => {
            channels.updateArticles(channelId, articles);
        }}>Zapisz</Button>
    </div>
};

export default ArticleList;