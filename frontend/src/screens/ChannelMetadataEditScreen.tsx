import Button from "../components/Button";
import Input from "../components/Input";

function ChannelMetadataEditScreen() {
  return <div className="channel-metadata-edit-screen">
    <main>
        <h1 className="channel-metadata-edit-screen-title">Wybierz Kanał</h1>
        <form className="metadata-form">
            <div className="metadata-form-col">
                <Input name="title" title="Tytuł" />
                <Input name="link" title="Link" />
                <Input name="description" title="Opis" />
                <Input name="language" title="Język" />
            </div>
            <div className="metadata-form-col">
                <Input name="copyright" title="Prawa autorskie" />
                <Input name="channel-manager" title="Manadżer kanału" />
                <Input name="publish-date" title="Data publikacji" />
                <Input name="category" title="Kategoria" />
            </div>
        </form>
        <Button style={{ width: "calc(100% - 40px)", fontSize: "21px", textAlign: "center" }}>Zapisz zmiany</Button>
    </main>
  </div>
}

export default ChannelMetadataEditScreen;
