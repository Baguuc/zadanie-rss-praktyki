import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { ChannelMetadata } from "../data/channels";
import { useChannels } from "../hooks/channels";

function ChannelMetadataEditScreen() {
  const navigate = useNavigate();
  const channels = useChannels();
  const { channelId: _channelId } = useParams();

  const [metadata, setMetadata] = useState<ChannelMetadata>({
    category: "",
    channelManager: "",
    copyright: "",
    description: "",
    language: "",
    link: "",
    publishedDate: "",
    title: ""
  });
  const [channelId, setChannelId] = useState(-1);

  useEffect(() => {
    const id = parseInt(_channelId || "");

    if(!id) {
      return;
    }

    setChannelId(id);
  }, []);

  useEffect(() => {
    const metadata = channels.find(channelId);
    if(!!metadata) {
      setMetadata(metadata);
    } else {
      return;
    }
  }, [channelId]);
  
    async function update() {
      await channels.updateMetadata({
        channelId,
        new: metadata
      });
      
      navigate(`/channels/${channelId}`);
    }

    return (
      <div className="channel-metadata-edit-screen">
        <main>
            <h1 className="channel-metadata-edit-screen-title">Edytuj metadane kanału</h1>
            <form className="metadata-form">
                <div className="metadata-form-col">
                    <Input 
                      name="title"
                      title="Tytuł" 
                      value={metadata.title}
                      onInput={(ev) => setMetadata(prev => { return { ...prev, title: (ev.target as any).value }} )}
                    />
                    <Input 
                      name="link" 
                      title="Link" 
                      value={metadata.link} 
                      onInput={(ev) => setMetadata(prev => { return { ...prev, link: (ev.target as any).value }} )}
                    />
                    <Input
                      name="description"
                      title="Opis"
                      value={metadata.description}
                      onInput={(ev) => setMetadata(prev => { return { ...prev, description: (ev.target as any).value }} )}
                    />
                    <Input
                      name="language"
                      title="Język"
                      value={metadata.language}
                      onInput={(ev) => setMetadata(prev => { return { ...prev, language: (ev.target as any).value }} )}
                    />
                </div>
                <div className="metadata-form-col">
                    <Input
                      name="copyright"
                      title="Prawa autorskie"
                      value={metadata.copyright}
                      onInput={(ev) => setMetadata(prev => { return { ...prev, copyright: (ev.target as any).value }} )}
                    />
                    <Input
                      name="channel-manager"
                      title="Manadżer kanału"
                      value={metadata.channelManager}
                      onInput={(ev) => setMetadata(prev => { return { ...prev, channelManager: (ev.target as any).value }} )}
                    />
                    <Input
                      name="publish-date"
                      title="Data publikacji"
                      value={metadata.publishedDate}
                      onInput={(ev) => setMetadata(prev => { return { ...prev, publishedDate: (ev.target as any).value }} )}
                    />
                    <Input 
                      name="category"
                      title="Kategoria"
                      value={metadata.category}
                      onInput={(ev) => setMetadata(prev => { return { ...prev, category: (ev.target as any).value }} )}
                    />
                </div>
            </form>
            <Button style={{ width: "calc(100% - 40px)", fontSize: "21px", textAlign: "center" }} onClick={() => update()}>Zapisz zmiany</Button>
        </main>
      </div>
    );
}

export default ChannelMetadataEditScreen;
