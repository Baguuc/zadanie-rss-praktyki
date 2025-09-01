import { Link } from "react-router";
import Button from "../../components/ui/Button";
import ChannelList from "../../features/channel-list/ChannelList";
import Root from "../../layouts/Root";
import BackButton from "../../components/ui/BackButton";

const ChannelListScreen = () => {
  return <Root navbarChildren={[<BackButton />, <p className="font-bold">Edytor RSS</p>]}>
    <div className="flex flex-col gap-[10px] place-items-center place-content-center">
      <h1 className="text-[17px] font-bold p-0 m-0">Wybierz kanał do edycji</h1>
      <ChannelList />
      <p>lub</p>
      <Link to={"/channels/check"}><Button style={{ borderRadius: "8px" }}>Sprawdź zgodność kanału</Button></Link>
    </div>
  </Root>
}

export default ChannelListScreen;
