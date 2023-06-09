import React, { useEffect, useState } from "react";

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import api from "../utils/Api";

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

    const [selectedCard, setSelectedCard] = useState({});
    const [deleteCard, setDeleteCard] = useState({});

    const [currentUser, setCurrentUser] = useState({});

    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getCurrentUser()
            .then((user) => {
                setCurrentUser(user);
            })
            .catch((err) => { console.log(err) });
    }, []);

    useEffect(() => {
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

        setIsDeletePopupOpen(true);
        setDeleteCard(card);
    }

    function handleConfirmDelete(e) {
        e.preventDefault();
        api.deleteCard(deleteCard._id)
            .then(() => {
                setCards((cards) => cards.filter((c) => c._id !== deleteCard._id));
            })
            .catch((err) => { console.log(err) });
        closeAllPopups();
    }

    function handleUpdateUser({ name, about }) {
        api.setCurrentUser(name, about)
            .then((newUser) => { setCurrentUser(newUser) })
            .catch((err) => { console.log(err) });

        closeAllPopups();
    }

    function handleUpdateAvatar({ avatar }) {
        api.setUserAvatar(avatar)
            .then((newUser) => {
                const { name, about } = currentUser;
                setCurrentUser({ name, about, avatar: newUser.avatar })
            })
            .catch((err) => { console.log(err) });

        closeAllPopups();
    }

    function handleAddPlaceSubmit({ name, link }) {
        api.addCard(name, link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
            })
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
        setIsDeletePopupOpen(false);
        setSelectedCard({});
        setDeleteCard({});
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

                <PopupWithForm isOpen={isDeletePopupOpen} onClose={closeAllPopups} name='confirm' title='Вы уверены?' submitButtonName='Да' onSubmit={handleConfirmDelete} />

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

            </div>

        </CurrentUserContext.Provider>
    );
}

export default App;
