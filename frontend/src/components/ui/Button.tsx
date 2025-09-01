import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    outlined?: boolean;
};

const Button = (props: Props) => {
    const outlined = props.outlined || false;
    
    if(!outlined) {
        return <button {...props} className="bg-neutral-800 rounded-[2px] p-[8px] gap-[8px] w-full h-fit hover:bg-neutral-900 active:bg-neutral-800 duration-100">{props.children}</button>;
    }

    if(outlined) {
        return <button {...props} className="bg-neutral-800 rounded-[2px] p-[8px] gap-[8px] w-full h-fit border-1 hover:bg-neutral-900 active:bg-neutral-800 duration-100"></button>
    }
}

export default Button;