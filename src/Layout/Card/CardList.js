import React, { useState, useEffect } from "react";
import Card from "./Card";

function CardList({deck, deleteCardById}) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(deck.cards);
    }, [deck.cards]);

    return (
        <>
        <div>
            <h2>Cards</h2>
            {cards ? 
            cards.map((card, index) => <Card key={index} card={card} deleteCardById={deleteCardById} />)
            : "Loading..."}
        </div>
        </>
    )
};

export default CardList;