import Button from "../components/Button";
import Input from "../components/Input";

function ChannelItemAddScreen() {
  return <div className="channel-metadata-edit-screen">
    <main>
        <h1 className="channel-metadata-edit-screen-title">Dodaj wpis do kanału</h1>
        <form className="items-form">
            <div className="item-form-row">
                <Input name="title" title="Tytuł" />
                <Input name="link" title="Link" />
                <Input name="description" title="Opis" />
                <Input name="author" title="Autor" />
            </div>
            <div className="item-form-row">
                <Input name="category" title="Kategoria" />
                <Input name="comments-link" title="Link do komentarzy" />
                <Input name="source" title="Źródło" />
            </div>
        </form>
        <Button style={{ width: "calc(100% - 40px)", fontSize: "21px", textAlign: "center" }}>Dodaj</Button>
    </main>
  </div>
}

export default ChannelItemAddScreen;
