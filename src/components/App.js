import React, { useEffect, useState } from "react";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import api from "../utils/Api";

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    const [currentUser, setCurrentUser ] =  React.useState({});

    React.useEffect(() => {
        api.getCurrentUser()
          .then((user) => {
            setCurrentUser(user);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

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
                <Main onCardClick={handleCardClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick} />
                <Footer />
            </div>


            <ImagePopup onClose={closeAllPopups} card={selectedCard} />

            <PopupWithForm name='confirm' title='Вы уверены?' submitButtonName='Да' />

            <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name='avatar' title='Обновить аватар' submitButtonName='Сохранить'>
                <input className="popup__input popup__input_type_avatar" id="url-avatar-input" type="url" name="avatar"
                    placeholder="Ссылка на аватар" required />
                <span className="popup__error url-avatar-input-error"></span>
            </PopupWithForm>

            <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name='profile' title='Редактировать профиль' submitButtonName='Сохранить'>
                <input className="popup__input popup__input_type_name" id="place-name-input" type="text" name="name"
                    placeholder="Название" minLength="2" maxLength="30" required />
                <span className="popup__error place-name-input-error"></span>

                <input className="popup__input popup__input_type_about" id="url-input" type="url" name="link"
                    placeholder="Ссылка на картинку" required />
                <span className="popup__error url-input-error"></span>
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
