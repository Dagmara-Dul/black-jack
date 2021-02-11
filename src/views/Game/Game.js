import React from 'react';
import styles from './Game.module.scss';

class Game extends React.Component{

    state = {
        round: 0,
        deckKey: "",
        userCards : [],
        casinoCards: []
        
    }

    

    shuffleCards = () =>{
        let deckKey = this.state.deckKey;
        
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6')
        .then(newDeck => newDeck.json())
        // .then(data => console.log(data.deck_id))
        // .then(data => this.setState({deckKey:data.deck_id}))
        // .then(console.log(deckKey))
        .then(data => fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`) )
        .then(firstRoundCards => firstRoundCards.json())
        .then(da => (this.setState({userCards: [da.cards[1].image]})))
        .then(console.log(this.state.userCards))
        // .then(data => console.log(data.deck_id))
        // .then(fetch('https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2'))
        // .then(resp => console.log(resp))
        .catch(err => console.log(err))
    };

    

    render(){
        
        return(
            <>
            <h1>widok gry</h1>
            <button onClick={() => this.shuffleCards()}>sprawdz karty</button>
            <div className={styles.croupierCardsPackage}>karty krupiera</div>
            <div className={styles.userCardsPackage}>karty gracza</div>
            </>
        )
    }
}

export default Game;