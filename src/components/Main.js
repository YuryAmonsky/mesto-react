import React from 'react';

function Main(){
  return(
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src="#" alt="аватар" />
        </div>  
        <div className="profile__info">
          <h1 className="profile__name"></h1>
          <button className="profile__edit-button" type="button"></button>
          <p className="profile__about-me"></p>
        </div>
        <button className="profile__add-button" type="button"></button>
      </section>
      <section aria-label="locations">
        <ul className="location-list">
        </ul>
      </section>
    </main>
  );
}  

export default Main;