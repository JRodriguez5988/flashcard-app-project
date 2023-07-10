import React from "react";
import { deleteCard } from "../utils/api";
import { Link, useRouteMatch } from "react-router-dom";

function Card({card, deleteCardById }) {
    const url = useRouteMatch().url;
    const cardId = card.id;
    const handleDelete = (event) => {
        event.preventDefault();
        if (window.confirm("Delete this card? You will not be able to recover it.")) {
            deleteCard(cardId);
            deleteCardById(cardId);            
        };
    };

    return (
        <>
        <div className="card">
            <div className="card-body" style={{display: "flex", flexDirection: "row"}}>
                <p className="col-6">{card.front}</p>
                <p className="col-6">{card.back}</p>
            </div>
            <div className="card-body" style={{textAlign: "right"}}>
                <Link to={`${url}/cards/${cardId}/edit`} relative="path" style={{marginRight: "5px"}} type="button" className="btn btn-secondary">Edit</Link>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
        </div>
        </>
    )
};

export default Card;