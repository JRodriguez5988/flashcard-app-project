import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, readCard, updateCard } from "../../utils/api";

function CardEdit({editCard}) {
    const history = useHistory();
    console.log(useParams());
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

    const handleChange = ({target}) => {
        const value = target.value;
        const newFormData = {...formData, [target.name]: value}
        setFormData(newFormData);
    };

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
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </section>
        </>
    )
};

export default CardEdit;