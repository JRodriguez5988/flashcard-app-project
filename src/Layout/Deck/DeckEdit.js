import React, { useState, useEffect } from "react";
import { updateDeck, readDeck } from "../../utils/api";
import { Link, useParams, useHistory } from "react-router-dom";


function DeckEdit({editDeck}) {
    const history = useHistory();
    const deckId = useParams().deckId

    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function read() {
            const deckFromApi = await readDeck(deckId);
            setDeck(deckFromApi);
        };
        read();
    }, [deckId]);

    const initialFormState = {
        name: deck.name,
        description: deck.description,
        id: deckId,
    };

    const [formData, setFormData] = useState(initialFormState);

    const handleChange = ({target}) => {
        const value = target.value;
        const newFormData = {...formData, [target.name]: value};
        setFormData(newFormData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newDeck = await updateDeck(formData);
        setDeck(newDeck);
        editDeck(newDeck);
        history.push(`/decks/${deckId}`)
    };

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <section>
            <h3>Edit Deck</h3>
            <form>
                <label htmlFor="name">Name</label>
                <br/>
                <input
                name="name"
                type="text"
                id="name"
                key={deck.name}
                value={formData.name}
                onChange={handleChange}
                defaultValue={deck.name}
                style={{width: "100%"}}
                />
                <br/>
                <label htmlFor="description">Description</label>
                <br/>
                <textarea
                name="description"
                type="text"
                id="description"
                onChange={handleChange}
                value={formData.description}
                defaultValue={deck.description}
                style={{width: "100%"}}
                />
                <br/>
            <Link to={`/decks/${deckId}`} style={{marginRight: "5px"}} type="button" className="btn btn-secondary" >Cancel</Link>
            <button className="btn btn-primary"  type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </section>
        </>
    )
};

export default DeckEdit;
