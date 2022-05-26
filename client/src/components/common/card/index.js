import { CardContainer, CardHeader } from "./style"

const Card = (props) => {
    const { header, children } = props;
    return (
        <CardContainer>
            {header && <CardHeader>
                <h2>{header}</h2>
            </CardHeader>}
            {children}
        </CardContainer>    
    )
}

export default Card;