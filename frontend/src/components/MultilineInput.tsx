import { HTMLProps } from "react";

function MultilineInput(props: HTMLProps<HTMLTextAreaElement> & { title: string }) {
  1;
  return (
    <div className="inpt-root" style={{ width: "400px", height: "200px" }}>
      <label htmlFor={props.name}>{props.title}</label>
      <textarea {...props} placeholder="..." className="inpt" style={{ width: "100%", height: "100%" }}></textarea>
    </div>
  );
}

export default MultilineInput;