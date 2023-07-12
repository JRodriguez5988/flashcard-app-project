import React, { useState } from "react";
import { createDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";


function CreateDeck() {
    const history = useHistory();
    const initialFormState = {
        name: "",
        description: "",
    };

    const [formData, setFormdata] = useState(initialFormState);

    const handleChange = ({target}) => {
        const value = target.value;
        const newFormData = {...formData, [target.name]: value};
        setFormdata(newFormData);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createDeck(formData);
        setFormdata(initialFormState);
        history.push("/");
    };

    return (
        <>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
        </nav>
        <section className="container">
        <form>
            <label htmlFor="name">Name</label>
            <br/>
            <input
            name="name"
            type="text"
            id="name"
            onChange={handleChange}
            value={formData.name}
            style={{width: "100%"}}
            placeholder="Deck Name"
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
            style={{width: "100%"}}
            placeholder="Enter a description"
            />
            <br/>
        <Link to="/" type="button" className="btn btn-secondary" style={{marginRight: "5px"}}>Cancel</Link>
        <Link to="/" className="btn btn-primary"  type="submit" onClick={handleSubmit}>Submit</Link>
        </form>
        </section>
        </>
    )
};

export default CreateDeck