import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck } from "../utils/api";

function CardStudy({deck}) {
    const history = useHistory();
    const deckId = useParams().deckId;
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({});
    const [index, setIndex] = useState(0);

    useEffect(() => {
        async function read() {
            const deckFromApi = await readDeck(deckId);
            setCards(deckFromApi.cards);
        }
        read();
    }, [deckId]);


    useEffect(() => {
        setCard(cards.find((card, idx) => idx === index));
    }, [cards, index]);
    
    const [toggle, setToggle] = useState(false);
    const handleFlip = (event) => {
        setToggle(!toggle);
    };

    const handleNext = (event) => {
        if (index <= (cards.length - 2)) {
            setIndex(index + 1);
            setCard(cards.find((card, idx) => idx === index));
            setToggle(false);
        } else {
            if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
                setIndex(0);
                setCard(cards.find((card, idx) => idx === index));
                setToggle(false);
            } else {
                history.push("/");
            };
        };
    };

    return (
        <>
        <div className="card">
            <div className="card-body">
                {cards.length > 2 ? (
                    <>
                    {card ? (
                        <>
                            <h3>Card {index + 1} of {cards.length}</h3>
                            {!toggle ? (
                                <>
                                    <p>{card.front}</p>
                                    <button type="button" className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                                </>
                            ) : (
                                <>
                                    <p>{card.back}</p>
                                    <button type="button" className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                                    <button type="button" className="btn btn-primary" style={{marginLeft: "5px"}} onClick={handleNext}>Next</button>
                                </>
                            )}
                        </>
                    ) : "Loading..."}
                    </>
                ) : (
                    <>
                    <h4>Not Enough Cards.</h4>
                    <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
                    <Link to={`/decks/${deckId}/cards/new`} type="button" className="btn btn-primary">+ Add Cards</Link>
                    </>
                )}
            </div>
        </div>
        </>
    )
};

export default CardStudy;