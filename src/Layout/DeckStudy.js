import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { readDeck } from "../utils/api";
import CardStudy from "./CardStudy";

function DeckStudy() {
    const deckId = useParams().deckId;

    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function read() {
            const deckFromApi = await readDeck(deckId);
            setDeck(deckFromApi);
        };
        read();
    }, [deckId]);
    

    return (
    <>
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
        </nav>
        <h2>Study: {deck.name}</h2>
        <CardStudy deck={deck} />
    </>
    )
};

export default DeckStudy;