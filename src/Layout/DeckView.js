import React from "react";
import { Link, Switch, Route, useHistory } from "react-router-dom";
import Deck from "./Deck";
import { deleteDeck } from "../utils/api";

function DeckView({deck, deleteDeckById}) {
    const history = useHistory()

    const handleDelete = async (event) => {
        event.preventDefault();
        if (window.confirm("Delete this deck? You will not be able to recover it.")) {
            await deleteDeck(deck.id);
            deleteDeckById(deck.id);
            history.push("/");
        };
    };

    return (
        <>
        <div className="card">
            <div className="card-body">
                <h2>{deck.name}</h2>
                <p>{deck.description}</p>
                <Link to={`/decks/${deck.id}`} style={{marginRight: "5px"}} type="button" className="btn btn-secondary">View</Link>
                <button style={{marginLeft: "5px", marginRight: "5px"}} type="button" className="btn btn-primary">Study</button>
                <Link to="/" type="button" style={{marginLeft: "425px"}} className="btn btn-danger" onClick={handleDelete}>Delete</Link>
            </div>           

        </div>
        <Switch>
            <Route path={`/decks/${deck.id}`}>
                <Deck deckId={deck.id} handleDelete={() => handleDelete}/>
            </Route>
        </Switch>
            
        </>
    )
};

export default DeckView;