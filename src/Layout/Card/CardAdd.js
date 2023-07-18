import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

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
            <CardForm formData={formData} setFormData={setFormData}/>
            <Link to={`/decks/${deckId}`} style={{marginRight: "5px"}} type="button" className="btn btn-secondary">Done</Link>
            <button type="submit" className="btn btn-primary">Save</button>
            </form>
        </section>
        </>

    )
};

export default CardAdd;