import React from 'react';
import styles from './Game.module.scss';
import PlayerCards from '../../components/PlayerCards/PlayerCards';
import Chip from '../../components/Chip/Chip';

class Game extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            round: 0,
            deckKey: "",
            playerCards : [],
            casinoCards: []
            
        }
    }
    
    createActionButtons = () =>{
        console.log('daga')
        document.getElementById('actionBtnPackage').style.display="block"
    }

    vanishButton = (id) => {
        document.getElementById(id).style.display='none';
    }

    shuffleCards = () =>{
        
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6') //tasowanie kart
        .then(newDeck => {
            return newDeck.json()
        })
        .then(data => {
            this.setState({deckKey:data.deck_id})
            return this.state.deckKey
        })
        .then(() => {
            console.log(this.state.deckKey)
            return fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckKey}/draw/?count=2`) //pobieranie 2-ch pierwszych kart
        })
        .then(firstRoundCards =>{
            return firstRoundCards.json()
        })
        .then (data1 =>{
            console.log(data1)
            return this.setState({playerCards: data1.cards.map(function(e){return e.image})})
        }).then(() =>{
            
            console.log(this.state.playerCards)
            
            const playerCardsPackage = document.getElementById('playerCardsPackage');

            this.state.playerCards.map(function(car){
                
                playerCardsPackage.insertAdjacentHTML('beforeend', `<div class=${styles.cards}> <img class=${styles.cardImage} src='${car}' /></div>`);
                // playerCardsPackage.insertAdjacentHTML('beforeend', ` <div class='cards' style="background-image: url('${car}')"> </div> `);
                
            })
        })
        .catch(err => console.log(err))
        this.vanishButton('initiateGame');
        this.createActionButtons(); 
    };

   

    render(){
        
        return(
            <>
            <h1>widok gry</h1>
            <button id='initiateGame' onClick={() => this.shuffleCards()}>sprawdz karty</button>
            <div className={styles.croupierCardsPackage}>
                <h2>karty krupiera</h2>
            </div>
            <PlayerCards></PlayerCards>
            <div className={styles.actionBtnPackage} id="actionBtnPackage">
                <Chip>Double</Chip>
                <Chip>Hit</Chip>
                <Chip>Stand</Chip>
            </div>
            </>
        )
    }
}

export default Game;