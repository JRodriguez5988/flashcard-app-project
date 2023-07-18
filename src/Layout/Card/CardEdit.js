import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";
import CardForm from "./CardForm";

function CardEdit({editCard}) {
    const history = useHistory();
    const deckId = useParams().deck;
    const cardId = useParams().cardId;

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

    useEffect(() => {
        async function read() {
            const deckFromApi = await readDeck(deckId);
            setDeck(deckFromApi);
        };
        read();
    }, [deckId]);


    useEffect(() => {
        async function read() {
            const cardFromApi = await readCard(cardId);
            setCard(cardFromApi);
        };
        read();
    }, [cardId]);
    
    const initialFormState = {
        front: card.front,
        back: card.back,
        id: cardId,
        deckId: deckId,
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleSubmit = async (event) => {
        event.preventDefault();
        formData.deckId = parseInt(formData.deckId, 10);
        const updatedCard = await updateCard(formData);
        const updatedCards = editCard(updatedCard);
        const newDeck = {...deck, cards: updatedCards};
        setDeck(newDeck);
        history.push(`/decks/${deckId}`);
    };


    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>Deck {deck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
            </ol>
        </nav>
        <h5>Edit Card</h5>
        <section>
            <form>
                <CardForm formData={formData} setFormData={setFormData} card={card}/>
                <Link to={`/decks/${deckId}`} style={{marginRight: "5px"}} type="button" className="btn btn-secondary">Cancel</Link>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </section>
        </>
    )
};

export default CardEdit;