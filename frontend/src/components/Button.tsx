function Button(props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return <button {...props} className="btn">{props.children}</button>
}

export default Button;