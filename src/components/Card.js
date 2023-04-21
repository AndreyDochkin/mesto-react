import React from "react";
import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = useContext(CurrentUserContext);

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLike() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick()
    {

    }


    const isOwn = props.card.owner._id === currentUser._id;
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `gallery__like ${isLiked && 'gallery__like_active'}`
    );

    return (
        <div className="gallery__item">
            <img src={props.card.link} alt={props.card.about} className="gallery__img"  onClick={handleClick}/>
            <div className="gallery__text">
                <h2 className="gallery__title">{props.card.name}</h2>
                <div className='gallery__like-section'>
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLike} />
                    <div className='gallery__like-count'>{props.card.likes.length}</div>
                </div>
            </div>
            {isOwn && <button className='gallery__delete' type="button" onClick={handleDeleteClick} />}
        </div>
    );
}

export default Card;