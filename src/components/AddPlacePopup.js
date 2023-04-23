import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [placeName, setPlaceName] = React.useState('');
    const [placeLink, setPlaceLink] = React.useState('');

    React.useEffect(() => {
        setPlaceName('');
        setPlaceLink('');
    }, [props.isOpen])

    function handleChangePlaceName(e) {
        setPlaceName(e.target.value);
    }

    function handleChangePlaceLink(e) {
        setPlaceLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: placeName,
            link: placeLink
        });
    }

    return (
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name='card' title='Новое место' submitButtonName='Создать'>
            <input className="popup__input popup__input_type_name" id="place-name-input" type="text" name="name"
                placeholder="Название" minLength="2" maxLength="30" value={placeName} onChange={handleChangePlaceName} required />
            <span className="popup__error place-name-input-error"></span>

            <input className="popup__input popup__input_type_about" id="url-input" type="url" name="link"
                placeholder="Ссылка на картинку" value={placeLink} onChange={handleChangePlaceLink} required />
            <span className="popup__error url-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;