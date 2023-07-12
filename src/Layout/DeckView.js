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
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <h2>{deck.name}</h2>
                    <p>{deck.cards.length} cards</p>
                </div>
                <p>{deck.description}</p>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                    <div>
                        <Link to={`/decks/${deck.id}`} style={{marginRight: "5px"}} type="button" className="btn btn-secondary">View</Link>
                        <Link to={`/decks/${deck.id}/study`} style={{marginLeft: "5px", marginRight: "5px"}} type="button" className="btn btn-primary">Study</Link>
                    </div>
                <Link to="/" type="button" style={{textAlign: "right"}} className="btn btn-danger" onClick={handleDelete}>Delete</Link>
                </div>
            </div>           

        </div>
        <Switch>
            <Route path={`/decks/${deck.id}`}>
                <Deck />
            </Route>
        </Switch>
            
        </>
    )
};

export default DeckView;