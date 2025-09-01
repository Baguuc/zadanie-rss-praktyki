import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { useNavigate } from "react-router";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    outlined?: boolean;
};

const BackButton = (props: Props) => {
    const navigate = useNavigate();
    const outlined = props.outlined || false;
    
    if(!outlined) {
        return <button {...props} className="bg-neutral-800 rounded-[2px] p-[8px] gap-[8px] w-fit h-fit hover:bg-neutral-900 active:bg-neutral-800 duration-100" onClick={() => navigate(-1)}>Wróć</button>;
    }

    if(outlined) {
        return <button {...props} className="bg-neutral-800 rounded-[2px] p-[8px] gap-[8px] w-fit h-fit border-1 hover:bg-neutral-900 active:bg-neutral-800 duration-100" onClick={() => navigate(-1)}>Wróć</button>
    }
}

export default BackButton;