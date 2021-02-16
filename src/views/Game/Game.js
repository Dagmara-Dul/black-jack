import React from 'react';
import styles from './Game.module.scss';

class Game extends React.Component{
    constructor (props){
        super(props);
        this.state = {
            round: 0,
            deckKey: "",
            userCards : [],
            casinoCards: []
            
        }
    }
    

    shuffleCards = () =>{
        
        let deckKey = this.state.deckKey;
        
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6') //tasowanie kart
        .then(newDeck => {
            return newDeck.json()
        })
        .then(data => {
            this.setState({deckKey:data.deck_id})
            console.log(data.deck_id)
            return this.state.deckKey
        })
        .then(deck => {
            console.log(this.state.deckKey)
            return fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckKey}/draw/?count=2`) //pobieranie 2-ch pierwszych kart
        })
        .then(firstRoundCards =>{
            return firstRoundCards.json()
        })
        .then (data1 =>{
            console.log(data1)
            return this.setState({userCards: data1.cards.map(function(e){return e.image})})
        }).then(singleCard =>{
            console.log(singleCard)
            console.log(this.state.userCards)
            let userCardsInFirstRound = "'" + this.state.userCards[0] + "'";
            console.log(userCardsInFirstRound)
            const userCardsPackage = document.getElementById('userCardsPackage');

            this.state.userCards.map(function(car){
                
                userCardsPackage.insertAdjacentHTML('beforeend', `<div class=${styles.cards}> <img src='${car}' /></div>`);
                
            })
            
            // this.state.userCards.map(function(card){
                
            //     userCardsPackage.appendChild(document.createElement("div").innerHTML=`<img src='${card}' />`)
            //     console.log(card)
            // })

            // var singleCTBox = document.createElement("div")
            // singleCTBox.innerHTML = `<img src=${userCardsInFirstRound} />`
            
                // test.innerHTML=`<img src=${userCardsInFirstRound} />`
            
            // userCardsPackage.appendChild(singleCTBox)
            
            
                // <div className="CardsImages">
                    {/* ${this.state.userCards.map(function(image){
                        return `<img src=${image} className="singleCardImage"/> `
                    })} */}
                    
                // </div>
                
                // userCardsInFirstRound.map(function(element){
                //     userCardPackage.appendChild(element)
                // })
        })
        
        .catch(err => console.log(err))
    };

   

    render(){
        
        return(
            <>
            <h1>widok gry</h1>
            <button onClick={() => this.shuffleCards()}>sprawdz karty</button>
            <div className={styles.croupierCardsPackage}>karty krupiera</div>
            <div className={styles.userCardsPackage} id="userCardsPackage">karty gracza
                <div id="first"></div>
                <div id="second"></div>
                <div id="third"></div>
                <div id="fourth"></div>
            </div>
            </>
        )
    }
}

export default Game;