import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    outlined?: boolean;
};

const Input = (props: Props) => {
    return <div className="bg-neutral-700 rounded-[2px] flex flex-row place-items-center place-content-around p-[10px]">
        <label htmlFor={props.name} className="w-fit">{props.placeholder}:</label>
        <input {...props} className="text-center focus:outline-0" />
    </div>
};

export default Input;