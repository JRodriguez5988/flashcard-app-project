import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom"
import CreateDeck from "./CreateDeck";
import DeckView from "./DeckView";
import { listDecks } from "../utils/api";

function Home() {
    const [decks, setDecks] = useState([])

    useEffect(() => {
        listDecks().then(result => setDecks(result));
    }, []);

    const deleteDeck = (deckId) => {
        const newDeck = decks.filter(deck => deck.id !== deckId);
        setDecks(newDeck);
    };

    return (
        <>
        <Link type="button" className="btn btn-secondary" to="/decks/new">+ Create Deck</Link>
        <Switch>
            <Route path="/decks/new">
                <CreateDeck />
            </Route>
        </Switch>
        <div>
            {decks.map((deck,index) => <DeckView key={index} deck={deck} deleteDeckById={deleteDeck} />)}
        </div>
        </>
    )
};

export default Home;