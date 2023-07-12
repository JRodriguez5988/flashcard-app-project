import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../utils/api";

function CardAdd({addCard}) {
    const deckId = useParams().deckId;
    const [deck, setDeck] = useState({})

    useEffect(() => {
        async function read() {
            const deckFromApi = await readDeck(deckId);
            setDeck(deckFromApi);
        }
        read();
    }, [deckId]);

    const initialFormState = {
        front: "",
        back: "",
    };

    const [formData, setFormData] = useState(initialFormState)

    const handleChange = ({target}) => {
        const value = target.value;
        const newFormData = {...formData, [target.name]: value};
        setFormData(newFormData);
    };

    const handleSave = async (event) => {
        event.preventDefault();
        const newCard = await createCard(deckId, formData);
        addCard(newCard);
        setFormData(initialFormState);
    }

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
        <h5>{deck.name} : Add Card</h5>
        <section>
            <form onSubmit={handleSave}>
                <label htmlFor="front">Front</label>
                <textarea
                name="front"
                id="front"
                type="text"
                value={formData.front}
                onChange={handleChange}
                style={{width: "100%"}}
                placeholder="Front side of card"
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
                placeholder="Back side of card"
                />
                <Link to={`/decks/${deckId}`} style={{marginRight: "5px"}} type="button" className="btn btn-secondary">Done</Link>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </section>
        </>
        )
};

export default CardAdd;