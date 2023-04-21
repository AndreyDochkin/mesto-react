import React, { useEffect, useState } from "react";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";

import api from "../utils/Api";

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    const [currentUser, setCurrentUser] = React.useState({});

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getCurrentUser()
            .then((user) => {
                setCurrentUser(user);
            })
            .catch((err) => { console.log(err) });
    }, []);


    React.useEffect(() => {
        api.getCards()
            .then((cardItems) => {
                setCards(cardItems);
            })
            .catch((err) => { console.log(err) });
    }, []);


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => { console.log(err) });
    }

    function handleDeleteClick(card) {
        api.deleteCard(card._id)
            .then((delCard) => {
                setCards((cards) => cards.filter((c) => c._id === delCard._id ? false : true));
            })
            .catch((err) => { console.log(err) });
    }

    function handleUpdateUser({ name, about }) {
        api.setCurrentUser(name, about)
            .then((newUser) => { setCurrentUser(newUser) })
            .catch((err) => { console.log(err) });
            
        closeAllPopups();
    }



    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard({ ...card });
    }


    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }


    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">

                <div className="page">
                    <Header />
                    <Main cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeleteClick} />
                    <Footer />
                </div>


                <ImagePopup onClose={closeAllPopups} card={selectedCard} />

                <PopupWithForm name='confirm' title='Вы уверены?' submitButtonName='Да' />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name='avatar' title='Обновить аватар' submitButtonName='Сохранить'>
                    <input className="popup__input popup__input_type_avatar" id="url-avatar-input" type="url" name="avatar"
                        placeholder="Ссылка на аватар" required />
                    <span className="popup__error url-avatar-input-error"></span>
                </PopupWithForm>


                <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name='card' title='Новое место' submitButtonName='Создать'>
                    <input className="popup__input popup__input_type_name" id="place-name-input" type="text" name="name"
                        placeholder="Название" minLength="2" maxLength="30" required />
                    <span className="popup__error place-name-input-error"></span>

                    <input className="popup__input popup__input_type_about" id="url-input" type="url" name="link"
                        placeholder="Ссылка на картинку" required />
                    <span className="popup__error url-input-error"></span>
                </PopupWithForm>

            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;
