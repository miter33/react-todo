interface IProps {
    className?: string;
    value: string
}

const Label: React.FC<IProps> = ({ className, value }) => {
    return (
        <p className={className}>{value}</p>
    )
}

export default Label;