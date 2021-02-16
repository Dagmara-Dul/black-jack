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
    

    

    // shuffleCards = () =>{
    //     let deckKey = this.stacardsapi.com/api/deck/new/shuffle/?deck_count=6')
    //     .then(newDeck => newDeck.json())
    //     // .then(data => console.log(data.deck_id))
    //     // .then(data => this.setState({deckKey:data.deck_id}))
    //     // .then(console.log(deckKey))
    //     .then(data => fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`) )
    //     .then(firstRoundCards => firstRoundCards.json())
    //     .then(da => (this.setState({userCards: [da.cards[1].image]})))
    //     .then(console.log(this.state.userCards))
    //     // .then(data => console.log(data.deck_id))
    //     // .then(fetch('https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2'))
    //     // .then(resp => console.log(resp))
    //     .catch(err => console.log(err))
    // };

    shuffleCards = () =>{
        
        let deckKey = this.state.deckKey;
        
        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6') //tasowanie kart
        .then(newDeck => {
            // console.log(newDeck.json())
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
            // console.log(this.state.userCards)
            // return this.state.userCards.map(function (card){
            //     console.log(card)
            // })
        }).then(singleCard =>{
            console.log(singleCard)
            console.log(this.state.userCards)
            let userCardsInFirstRound = "'" + this.state.userCards[0] + "'";
            console.log(userCardsInFirstRound)
            const test = document.getElementById('test');
            console.log(test)
            var singleCTBox = document.createElement("div")
            singleCTBox.innerHTML = `<img src=${userCardsInFirstRound} />`
            // test.innerHTML=`<img src=${userCardsInFirstRound} />`
            test.appendChild(singleCTBox)
            // <div className="CardsImages">
                {/* ${this.state.userCards.map(function(image){
                    return `<img src=${image} className="singleCardImage"/> `
                })} */}
                
            // </div>
            
            // userCardsInFirstRound.map(function(element){
            //     userCardPackage.appendChild(element)
            // })
        })
        // .then(data => console.log(data.deck_id))
        // .then(data => this.setState({deckKey:data.deck_id}))
        // .then(console.log(deckKey))

        // .then(data => fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`) )
        // .then(firstRoundCards => firstRoundCards.json())
        // .then(da => (this.setState({userCards: [da.cards[1].image]})))
        // .then(console.log(this.state.userCards))

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
            <div className={styles.userCardsPackage} id="test">karty gracza</div>
            </>
        )
    }
}

export default Game;