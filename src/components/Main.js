import React from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main(props) {

  const [userName, setuserName] = React.useState('');
  const [userDescription, setuserDescription] = React.useState('');
  const [useruserAvatar, setuseruserAvatar] = React.useState('');

  React.useEffect(() => {
    api.getCurrentUser()
      .then((user) => {
        setuserName(user.name);
        setuserDescription(user.about);
        setuseruserAvatar(user.avatar);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [cards, setCards] = React.useState([]);
  React.useEffect(() => {
    api.getCards()
      .then((cardItems) => {
        setCards(cardItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__overlay" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={useruserAvatar} alt="Аватар" />
        </div>

        <div className="profile__info">
          <div className="profile__name">
            <h1 className="profile__title">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={props.onCardClick}/>
        ))}
      </section>
    </main>
  );
}

export default Main;
