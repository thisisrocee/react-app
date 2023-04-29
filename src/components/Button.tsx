import "../styles/components/button.scss";

type ButtonProps = {
    onButtonClick?: () => void;
    children: JSX.Element | string;
    variant?: "primary" | "secondary" | "black";
};

export const Button = ({ onButtonClick, children, variant="primary" }: ButtonProps) => {
    return (
        <button className={`${variant}`} onClick={() => onButtonClick?.()}>
            {children}
        </button>
    );
};