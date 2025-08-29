import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate, useParams } from "react-router";
import { addArticle, Article } from "../data/channels";

function ChannelItemAddScreen() {
  const navigate = useNavigate();
  const { channelId } = useParams();
  
  const [data, setData] = useState<Article>({
    guid: "",
    link: "",
    description: "",
    author: "",
    commentsLink: "",
    source: "",
    title: "",
    category: "",
    publishedDate: "",
    content: "",
  });

  async function add() {
    await addArticle(parseInt(channelId!) as 1 | 2 | 3, data);
      
    navigate(`/channels/${channelId}`);
    return;
  }

  if(!channelId) {
    return <div className="channel-metadata-edit-screen" />
  }

  return <div className="channel-metadata-edit-screen">
    <main>
        <h1 className="channel-metadata-edit-screen-title">Dodaj wpis do kanału</h1>
        <form className="items-form">
            <div className="item-form-row">
                <Input 
                  name="title" 
                  title="Tytuł"
                  onInput={(ev) => setData(prev => { return { ...prev, title: (ev.target as any).value }; })}
                />
                <Input 
                  name="link" 
                  title="Link"
                  onInput={(ev) => setData(prev => { return { ...prev, link: (ev.target as any).value }; })}
                />
                <Input 
                  name="description" 
                  title="Opis" 
                  onInput={(ev) => setData(prev => { return { ...prev, description: (ev.target as any).value }; })}
                />
                <Input 
                  name="author" 
                  title="Autor" 
                  onInput={(ev) => setData(prev => { return { ...prev, author: (ev.target as any).value }; })}
                />
            </div>
            <div className="item-form-row">
                <Input 
                  name="category" 
                  title="Kategoria" 
                  onInput={(ev) => setData(prev => { return { ...prev, category: (ev.target as any).value }; })}
                />
                <Input 
                  name="comments-link" 
                  title="Link do komentarzy" 
                  onInput={(ev) => setData(prev => { return { ...prev, commentsLink: (ev.target as any).value }; })}
                />
                <Input 
                  name="source" 
                  title="Źródło" 
                  onInput={(ev) => setData(prev => { return { ...prev, source: (ev.target as any).value }; })}
                />
            </div>
        </form>
        <Button style={{ width: "calc(100% - 40px)", fontSize: "21px", textAlign: "center" }} onClick={() => add()}>Dodaj</Button>
    </main>
  </div>
}

export default ChannelItemAddScreen;
