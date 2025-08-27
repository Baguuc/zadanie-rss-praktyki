import { HTMLProps } from "react";

function Input(props: HTMLProps<HTMLInputElement> & { title: string; }) {1
    return <div className="inpt-root">
        <label htmlFor={props.name}>{props.title}</label>
        <input type="text" placeholder="..." name={props.name} {...props} />
    </div>
}

export default Input;