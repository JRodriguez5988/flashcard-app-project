import React from "react";

function CardForm({formData, setFormData, card}) {    
    const handleChange = ({target}) => {
        const value = target.value;
        const newFormData = {...formData, [target.name]: value};
        setFormData(newFormData);
    };

    return (
        <>
        <label htmlFor="front">Front</label>
        <textarea
        name="front"
        id="front"
        type="text"
        value={formData.front}
        onChange={handleChange}
        style={{width: "100%"}}
        placeholder="Front side of card"
        defaultValue={card.front}
        />
        <br/>
        <label htmlFor="back">Back</label>
        <textarea
        name="back"
        id="back"
        type="text"
        value={formData.back}
        onChange={handleChange}
        style={{width: "100%"}}
        placeholder="Back side of card"
        defaultValue={card.back}
        />               
        </>
        );
};

export default CardForm;