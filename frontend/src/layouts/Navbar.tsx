const Navbar = ({ children }: React.PropsWithChildren<{}>) => {
    return <div className="w-full min-h-[50px] flex flex-row place-content-center place-items-center p-[8x] gap-[10px] bg-neutral-700">{children}</div>;
}

export default Navbar;
