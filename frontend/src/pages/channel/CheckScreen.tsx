import BackButton from "../../components/ui/BackButton";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Root from "../../layouts/Root";

function ChannelCheckScreen() {
  return <Root navbarChildren={[<BackButton />, <p className="font-bold">Edytor RSS</p>]}>
    <div className="flex flex-col gap-[10px] place-items-center place-content-center">
      <h1 className="text-[17px] font-bold p-0 m-0">Sprawdź zgodność kanału</h1>
      <div className="p-[12px] gap-[12px] rounded-[8px] flex flex-col bg-neutral-800">
        <Input placeholder="Link" defaultValue="..." />
      </div>
      <Button>Sprawdź</Button>
    </div>
  </Root>
}

export default ChannelCheckScreen;
