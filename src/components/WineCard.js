import * as React from 'react'
import { Card, Button } from 'react-bootstrap';

function WineCard(props) {
    const { winery, image,  wine, price, rating, handleClick } = props;
    return (
        <Card style={{ width: '18em' }}>
            <Card.Img variant="top" src={image} style={{width: 8 + 'em', marginRight: "auto",  marginLeft: "auto"}} />
            <Card.Body>
                <Card.Title><b>{wine}</b> - {winery}<br></br>
                    <b>Price</b> - {price} Baht<br></br>
                    <b>Rating</b> - {rating.average}
                </Card.Title>
                <Button variant="primary" onClick={handleClick}>Add to Cart</Button>
            </Card.Body>
        </Card>
    )
}

export default WineCard