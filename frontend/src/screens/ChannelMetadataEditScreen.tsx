import { useNavigate, useParams } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { useEffect, useState } from "react";
import { Channel, getChannel, updateChannel } from "../data/channels";

function ChannelMetadataEditScreen() {
  const navigate = useNavigate();
  const { channelId } = useParams();

  const [ channel, setChannel ] = useState<Partial<Channel>>();

  useEffect(() => {
    const id = parseInt(channelId || "");

    if(!id) {
      navigate("/channels")
    }

    getChannel(id).then(setChannel);
  }, []);
  
  if(!channel) {
    return <div className="channel-metadata-edit-screen" />
  } else {
    async function update() {
      await updateChannel(channel!.id as 1 | 2 | 3, channel!);
      
      navigate(`/channels/${channel?.id}`);
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
                      value={channel.title}
                      onInput={(ev) => setChannel(prev => { return { ...prev, title: (ev.target as any).value }} )}
                    />
                    <Input 
                      name="link" 
                      title="Link" 
                      value={channel.link} 
                      onInput={(ev) => setChannel(prev => { return { ...prev, link: (ev.target as any).value }} )}
                    />
                    <Input
                      name="description"
                      title="Opis"
                      value={channel.description}
                      onInput={(ev) => setChannel(prev => { return { ...prev, description: (ev.target as any).value }} )}
                    />
                    <Input
                      name="language"
                      title="Język"
                      value={channel.language}
                      onInput={(ev) => setChannel(prev => { return { ...prev, language: (ev.target as any).value }} )}
                    />
                </div>
                <div className="metadata-form-col">
                    <Input
                      name="copyright"
                      title="Prawa autorskie"
                      value={channel.copyright}
                      onInput={(ev) => setChannel(prev => { return { ...prev, copyright: (ev.target as any).value }} )}
                    />
                    <Input
                      name="channel-manager"
                      title="Manadżer kanału"
                      value={channel.channelManager}
                      onInput={(ev) => setChannel(prev => { return { ...prev, channelManager: (ev.target as any).value }} )}
                    />
                    <Input
                      name="publish-date"
                      title="Data publikacji"
                      value={channel.publishedDate}
                      onInput={(ev) => setChannel(prev => { return { ...prev, publishedDate: (ev.target as any).value }} )}
                    />
                    <Input 
                      name="category"
                      title="Kategoria"
                      value={channel.category}
                      onInput={(ev) => setChannel(prev => { return { ...prev, category: (ev.target as any).value }} )}
                    />
                </div>
            </form>
            <Button style={{ width: "calc(100% - 40px)", fontSize: "21px", textAlign: "center" }} onClick={() => update()}>Zapisz zmiany</Button>
        </main>
      </div>
    );
  }
}

export default ChannelMetadataEditScreen;
