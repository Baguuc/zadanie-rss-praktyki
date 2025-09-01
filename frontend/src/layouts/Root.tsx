import { ReactNode } from "react";
import Main from "./Main";
import Navbar from "./Navbar";

type Props = {
    navbarChildren?: ReactNode;
};

const Root = ({ children, navbarChildren }: React.PropsWithChildren<Props>) => {
  return <div className="flex flex-col text-white">
    <Navbar>{navbarChildren}</Navbar>
    <Main>{children}</Main>
  </div>;
}

export default Root;
