import { useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { Channel, createChannel } from "../data/channels";

function ChannelMetadataEditScreen() {
    const navigate = useNavigate();

    const [newData, setNewData] = useState<Omit<Omit<Channel, 'id'>, 'articles'>>({
      category: "",
      channelManager: "",
      copyright: "",
      description: "",
      language: "",
      link: "",
      publishedDate: "",
      title: ""
    });

    async function create() {
      const channel = await createChannel(newData);
      
      navigate(`/channels/${channel.id}`);
    }

     return (
      <div className="channel-metadata-edit-screen">
        <main>
            <h1 className="channel-metadata-edit-screen-title">Stwórz kanał</h1>
            <form className="metadata-form">
                <div className="metadata-form-col">
                    <Input 
                      name="title"
                      title="Tytuł" 
                      value={newData.title}
                      onInput={(ev) => setNewData(prev => { return { ...prev, title: (ev.target as any).value }} )}
                    />
                    <Input 
                      name="link" 
                      title="Link" 
                      value={newData.link} 
                      onInput={(ev) => setNewData(prev => { return { ...prev, link: (ev.target as any).value }} )}
                    />
                    <Input
                      name="description"
                      title="Opis"
                      value={newData.description}
                      onInput={(ev) => setNewData(prev => { return { ...prev, description: (ev.target as any).value }} )}
                    />
                    <Input
                      name="language"
                      title="Język"
                      value={newData.language}
                      onInput={(ev) => setNewData(prev => { return { ...prev, language: (ev.target as any).value }} )}
                    />
                </div>
                <div className="metadata-form-col">
                    <Input
                      name="copyright"
                      title="Prawa autorskie"
                      value={newData.copyright}
                      onInput={(ev) => setNewData(prev => { return { ...prev, copyright: (ev.target as any).value }} )}
                    />
                    <Input
                      name="channel-manager"
                      title="Manadżer kanału"
                      value={newData.channelManager}
                      onInput={(ev) => setNewData(prev => { return { ...prev, channelManager: (ev.target as any).value }} )}
                    />
                    <Input
                      name="publish-date"
                      title="Data publikacji"
                      value={newData.publishedDate}
                      onInput={(ev) => setNewData(prev => { return { ...prev, publishedDate: (ev.target as any).value }} )}
                    />
                    <Input 
                      name="category"
                      title="Kategoria"
                      value={newData.category}
                      onInput={(ev) => setNewData(prev => { return { ...prev, category: (ev.target as any).value }} )}
                    />
                </div>
            </form>
            <Button style={{ width: "calc(100% - 40px)", fontSize: "21px", textAlign: "center" }} onClick={() => create()}>Stwórz</Button>
        </main>
      </div>
    );
}

export default ChannelMetadataEditScreen;
