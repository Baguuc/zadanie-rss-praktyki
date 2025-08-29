import Button from "../components/Button";
import Input from "../components/Input";

function ChannelCorrectnessCheckScreen() {
  return (
    <div className="channel-metadata-edit-screen">
      <main>
        <h1 className="channel-metadata-edit-screen-title">
          Sprawdź poprawność kanału
        </h1>
        <form className="items-form">
          <Input title="Link do kanału" />
        </form>
        <Button
          style={{ width: "200px", fontSize: "21px", textAlign: "center" }}
        >
          Sprawdź
        </Button>
      </main>
    </div>
  );
}

export default ChannelCorrectnessCheckScreen;
