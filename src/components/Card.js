import React from "react";

function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className="gallery__item" onClick={handleClick}>
            <img src={props.card.link} alt={props.card.about} className="gallery__img" />
            <div className="gallery__text">
                <h2 className="gallery__title">{props.card.name}</h2>
                <div className='gallery__like-section'>
                    <button className="gallery__like" type="button"></button>
                    <div className="gallery__like-count">{props.card.likes.length}</div>
                </div>
            </div>
            <button className="gallery__delete" type="button"></button>
        </div>
    );
}

export default Card;