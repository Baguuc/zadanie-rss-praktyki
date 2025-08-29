import { useNavigate } from "react-router";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState } from "react";
import { ChannelMetadata } from "../data/channels";
import { useChannels } from "../hooks/channels";

function ChannelMetadataEditScreen() {
  const navigate = useNavigate();
  const channels = useChannels();

  const [data, setData] = useState<ChannelMetadata>({
    category: "",
    channelManager: "",
    copyright: "",
    description: "",
    language: "",
    link: "",
    publishedDate: "",
    title: "",
  });

  async function create() {
    channels.create({ data });

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
              value={data.title}
              onInput={(ev) =>
                setData((prev) => {
                  return {
                    ...prev,
                    title: (ev.target as any).value,
                  };
                })
              }
            />
            <Input
              name="link"
              title="Link"
              value={data.link}
              onInput={(ev) =>
                setData((prev) => {
                  return {
                    ...prev,
                    link: (ev.target as any).value,
                  };
                })
              }
            />
            <Input
              name="description"
              title="Opis"
              value={data.description}
              onInput={(ev) =>
                setData((prev) => {
                  return {
                    ...prev,
                    description: (ev.target as any).value,
                  };
                })
              }
            />
            <Input
              name="language"
              title="Język"
              value={data.language}
              onInput={(ev) =>
                setData((prev) => {
                  return {
                    ...prev,
                    language: (ev.target as any).value,
                  };
                })
              }
            />
          </div>
          <div className="metadata-form-col">
            <Input
              name="copyright"
              title="Prawa autorskie"
              value={data.copyright}
              onInput={(ev) =>
                setData((prev) => {
                  return {
                    ...prev,
                    copyright: (ev.target as any).value,
                  };
                })
              }
            />
            <Input
              name="channel-manager"
              title="Manadżer kanału"
              value={data.channelManager}
              onInput={(ev) =>
                setData((prev) => {
                  return {
                    ...prev,
                    channelManager: (ev.target as any).value,
                  };
                })
              }
            />
            <Input
              name="publish-date"
              title="Data publikacji"
              value={data.publishedDate}
              onInput={(ev) =>
                setData((prev) => {
                  return {
                    ...prev,
                    publishedDate: (ev.target as any).value,
                  };
                })
              }
            />
            <Input
              name="category"
              title="Kategoria"
              value={data.category}
              onInput={(ev) =>
                setData((prev) => {
                  return {
                    ...prev,
                    category: (ev.target as any).value,
                  };
                })
              }
            />
          </div>
        </form>
        <Button
          style={{
            width: "calc(100% - 40px)",
            fontSize: "21px",
            textAlign: "center",
          }}
          onClick={() => create()}
        >
          Stwórz
        </Button>
      </main>
    </div>
  );
}

export default ChannelMetadataEditScreen;
