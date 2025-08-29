import { useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { CreateChannelParams } from "../data/channels";
import { useChannels } from "../hooks/channels";

function ChannelMetadataEditScreen() {
    const navigate = useNavigate();
    const channels = useChannels();

    const [newData, setNewData] = useState<CreateChannelParams>({
      data: {
        category: "",
        channelManager: "",
        copyright: "",
        description: "",
        language: "",
        link: "",
        publishedDate: "",
        title: ""
      }
    });

    async function create() {
      channels.create(newData);
      
      navigate(`/channels`);
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
                      value={newData.data.title}
                      onInput={(ev) => setNewData(prev => { return { data: { ...prev.data, title: (ev.target as any).value }} } )}
                    />
                    <Input 
                      name="link" 
                      title="Link" 
                      value={newData.data.link} 
                      onInput={(ev) => setNewData(prev => { return { data: { ...prev.data, link: (ev.target as any).value } }} )}
                    />
                    <Input
                      name="description"
                      title="Opis"
                      value={newData.data.description}
                      onInput={(ev) => setNewData(prev => { return { data: { ...prev.data, description: (ev.target as any).value } }} )}
                    />
                    <Input
                      name="language"
                      title="Język"
                      value={newData.data.language}
                      onInput={(ev) => setNewData(prev => { return { data: { ...prev.data, language: (ev.target as any).value } }} )}
                    />
                </div>
                <div className="metadata-form-col">
                    <Input
                      name="copyright"
                      title="Prawa autorskie"
                      value={newData.data.copyright}
                      onInput={(ev) => setNewData(prev => { return { data: { ...prev.data, copyright: (ev.target as any).value } }} )}
                    />
                    <Input
                      name="channel-manager"
                      title="Manadżer kanału"
                      value={newData.data.channelManager}
                      onInput={(ev) => setNewData(prev => { return { data: { ...prev.data, channelManager: (ev.target as any).value } }} )}
                    />
                    <Input
                      name="publish-date"
                      title="Data publikacji"
                      value={newData.data.publishedDate}
                      onInput={(ev) => setNewData(prev => { return { data: { ...prev.data, publishedDate: (ev.target as any).value } }} )}
                    />
                    <Input 
                      name="category"
                      title="Kategoria"
                      value={newData.data.category}
                      onInput={(ev) => setNewData(prev => { return { data: { ...prev.data, category: (ev.target as any).value } }} )}
                    />
                </div>
            </form>
            <Button style={{ width: "calc(100% - 40px)", fontSize: "21px", textAlign: "center" }} onClick={() => create()}>Stwórz</Button>
        </main>
      </div>
    );
}

export default ChannelMetadataEditScreen;
