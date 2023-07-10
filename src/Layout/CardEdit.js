import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../utils/api";

function CardEdit({editCard}) {
    const history = useHistory();
    const deckId = useParams().deck;
    const cardId = useParams().cardId;

    const [deck, setDeck] = useState({});
    const [card, setCard] = useState({});

    useEffect(() => {
        readDeck(deckId).then(result => setDeck(result));
    }, [deckId]);

    useEffect(() => {
        readCard(cardId).then(result => setCard(result));
    }, [cardId]);
    
    const initialFormState = {
        front: "",
        back: "",
        id: cardId,
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = ({target}) => {
        const value = target.value;
        const newFormData = {...formData, [target.name]: value}
        setFormData(newFormData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedCard = await updateCard(formData);
        editCard(updatedCard);
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
                <label htmlFor="front">Front</label>
                <textarea
                name="front"
                id="front"
                type="text"
                value={formData.front}
                onChange={handleChange}
                style={{width: "100%"}}
                defaultValue={card.front}
                />
                <br/>
                <label htmlFor="back">Back</label>
                <textarea
                name="back"
                id="back"
                type="text"
                value={formData.back}
                onChange={handleChange}
                style={{width: "100%"}}
                defaultValue={card.back}
                />
                <Link to={`/decks/${deckId}`} style={{marginRight: "5px"}} type="button" className="btn btn-secondary">Cancel</Link>
                <Link to={`/decks/${deckId}`} type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</Link>
            </form>
        </section>
        </>
    )
};

export default CardEdit;