const Main = ({ children }: React.PropsWithChildren<{}>) => {
    return <div className="w-full h-[calc(100dvh-50px)] flex flex-col place-content-center place-items-center bg-neutral-800 p-[32px]">
        <div className="w-full h-full bg-neutral-700 rounded-[16px] p-[10px] gap-[10px] flex flex-col place-content-center place-items-center">{children}</div>
    </div>
}

export default Main;
