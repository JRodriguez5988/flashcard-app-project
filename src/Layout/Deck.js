import React, { useEffect, useState } from "react";
import { useParams, Link, Switch, Route } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardList from "./CardList";
import DeckEdit from "./DeckEdit";
import CardAdd from "./CardAdd";
import NotFound from "./NotFound";
import CardEdit from "./CardEdit";

function Deck({handleDelete}) {
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);

    const deckId = useParams().deckId;

    useEffect(() => {
        readDeck(deckId).then(result => {
            setDeck(result);
        });
    }, [deckId]);

    useEffect(() => {
        setCards(deck.cards);
    }, [deck.cards]);

    const editDeck = (updatedDeck) => {
        const newDeck = {...updatedDeck, cards: deck.cards}
        setDeck(newDeck);
    };

    const addCard = (card) => {
        const newCards = [...cards, card]
        setCards(newCards);
        const newDeck = {...deck, cards: newCards};
        setDeck(newDeck);
    };

    const deleteCardById = (cardId) => {
        const newCards = cards.filter(card => card.id !== cardId);
        setCards(newCards);
        const newDeck = {...deck, cards: newCards};
        setDeck(newDeck);
    };

    const editCard = (updatedCard) => {
        const index = cards.findIndex(card => card.id === updatedCard.id);
        cards[index].front = updatedCard.front;
        cards[index].back = updatedCard.back;
        setCards(cards);
        const updatedDeck = {...deck, cards: cards};
        setDeck(updatedDeck);
    };


    return (
        <>
        <Switch>
            <Route exact path={`/decks/${deckId}`}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                    </ol>
                </nav>
                <div>
                    <h2>{deck.name}</h2>
                    <p>{deck.description}</p>
                    <Link to={`/decks/${deckId}/edit`} style={{marginRight: "5px"}} type="button" className="btn btn-secondary">Edit</Link>
                    <button style={{marginLeft: "5px", marginRight: "5px"}} type="button" className="btn btn-primary">Study</button>
                    <Link to={`/decks/${deckId}/cards/new`} style={{marginLeft: "5px", marginRight: "5px"}} type="button" className="btn btn-primary">+ Add Cards</Link>
                    <button style={{marginLeft: "350px"}} type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                </div>
                <CardList deck={deck} deleteCardById={deleteCardById} />
            </Route>
            <Route path="/decks/:deckId/edit">
                <DeckEdit editDeck={editDeck} />
            </Route>
            <Route path="/decks/:deckId/cards/new">
                <CardAdd addCard={addCard} />
            </Route>
            <Route path="/decks/:deck/cards/:cardId/edit">
                <CardEdit editCard={editCard} />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
        </>
    )
};

export default Deck;