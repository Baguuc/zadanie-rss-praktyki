import { Link } from "react-router";
import BackButton from "../components/ui/BackButton";
import Button from "../components/ui/Button";
import Root from "../layouts/Root";

const Index = () => {
    return <Root navbarChildren={[<BackButton />, <p className="font-bold">Edytor RSS</p>]}>
        <div className="flex flex-col gap-[10px] place-items-center place-content-center">
            <Link to={"/channels"}><Button style={{ borderRadius: "8px" }}>Zobacz kanały</Button></Link>
            <Link to={"/channels/sync"}><Button style={{ borderRadius: "8px" }}>Wyślij kanały na serwer</Button></Link>
            <Link to={"/channels/check"}><Button style={{ borderRadius: "8px" }}>Sprawdź zgodność kanału</Button></Link>
        </div>
    </Root>
};

export default Index;