import { Link, LinkProps } from "react-router";

function ButtonLink(props: React.PropsWithChildren<LinkProps>) {
    return <Link {...props} className="btn">{props.children}</Link>
}

export default ButtonLink;