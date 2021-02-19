import React from 'react';
import styles from './Game.module.scss';
import PlayerCards from '../../components/PlayerCards/PlayerCards';
import Chip from '../../components/Chip/Chip';
import Button from '../../components/Button/Button'
import Bankbet from '../../components/Bankbet/Bankbet'
import Counter from '../../components/Counter/Counter';
import cardBack from '../../media/cardBack.png';

class Game extends React.Component{

    constructor (props){
        super(props);
        this.state = {
            round: 0,
            deckKey: "",
            playerCards : [],
            casinoCards: [],
            playerRoundCardsValues: 0,
            casinoRoundCardsValues: 0,
            playerRoundScore:0,
            casinoRoundScore:0,
            bank:0,
            bet:0
        }
    }

    addPoints = (whoseScore) =>{
        if(this.state[`${whoseScore}RoundCardsValues`]){

            var cardsNames= this.state[`${whoseScore}RoundCardsValues`];
            var cardsScores = cardsNames.map(function(singleCard){
                if(singleCard==="QUEEN" || singleCard==="KING" || singleCard==="JACK"){
                    return 10
                }else if(singleCard==="ACE"){
                    return 11
                }else{return parseInt(singleCard,10)}
            })
            
            return cardsScores.reduce((a,b)=> a+b,0)
        }
    }
    
    showHiddenCard = (placeId)=>{
        let cardPackage = document.getElementById(placeId)
        cardPackage.insertAdjacentHTML('beforeend', `<div class=${styles.cards}> <img class=${styles.cardBack} src=${cardBack} /></div>`)
    }

    showCards = (placeId,whoseCard) =>{
        let cardPackage = document.getElementById(placeId);
        whoseCard.map(function(card){
            cardPackage.insertAdjacentHTML('beforeend', `<div class=${styles.cards}> <img class=${styles.cardImage} src='${card}' /></div>`);
            // playerCardsPackage.insertAdjacentHTML('beforeend', ` <div class='cards' style="background-image: url('${car}')"> </div> `);
        })
    }
    
    createActionButtons = () =>{
        document.getElementById('actionBtnPackage').style.display="block"
    }

    removeButton = (id) => {
        document.getElementById(id).style.display='none';<div className={styles.countersPackage}>
        <div className={styles.bankCounterPackage}>Bank: ${this.state.bank}</div>
        <div className={styles.betCounterPackage}>Bet: ${this.state.bet}</div>
    </div>
    }

    getBankAndBetValues = (counter) =>{
        let bankAndBetValues = sessionStorage.getItem('bankAndBetValues');
        bankAndBetValues = JSON.parse(bankAndBetValues)
        console.log(bankAndBetValues)
        this.setState({bank:bankAndBetValues.bank, bet:bankAndBetValues.bet})
        if(counter==="bank"){
            return bankAndBetValues.bank
        }else{return bankAndBetValues.bet}   
    }

    dealCards = (howMany,  toWhom) =>{
        // const howMany = toWhom=="casino"?howMany=1:howMany=2
        if(this.state.deckKey !== ""){
            
            return fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckKey}/draw/?count=${howMany}`,{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
            .then(data => data.json()
            ) 
            .then(cardDetails =>{
                console.log(cardDetails)
                return this.setState({ 
                    [`${toWhom}Cards`]: cardDetails.cards.map(function(e){return e.image}),
                    [`${toWhom}RoundCardsValues`]: cardDetails.cards.map(function(e){return e.value})
                })
            })
            .then(()=>{
                console.log(this.state[`${toWhom}Cards`])
                console.log(this.state[`${toWhom}RoundCardsValues`])
                this.showCards(`${toWhom}CardsPackage`,this.state[`${toWhom}Cards`] )
                if(toWhom == 'casino'){
                    this.showHiddenCard(`${toWhom}CardsPackage`)
                };
            })
            .then(()=>{
                this.setState({
                    [`${toWhom}RoundScore`]:this.addPoints(toWhom)
                })
            })
                
            
        }else{
            console.log("can't deal cards, there is no deck chosen")
        }
    }
    
    startGame = () =>{
    
        this.getBankAndBetValues()

        fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6') //tasowanie kart
        .then(newDeck => {
            return newDeck.json()
        })
        .then(data => {
            this.setState({deckKey:data.deck_id})
            return this.state.deckKey
        })
        .then(()=>{
            const playerCards = 'player'
            this.dealCards(2,playerCards)
        })
        .then(()=>{
            const casinoCards = 'casino'
            this.dealCards(1,casinoCards)
        })
        .catch(err => console.log(err))
        this.removeButton('initiateGame');
        this.createActionButtons();   
    };

    render(){
        
        return(
            <>
            
            <Bankbet bankValue={this.state.bank } betValue={this.state.bet}></Bankbet>
            {/* <button id='initiateGame' onClick={() => this.startGame()}>play</button> */}
            <Button id='initiateGame' onClick={() => this.startGame()} >start</Button>
            <div className={styles.croupiePackage}>
                <Counter points={this.state.casinoRoundScore}>casino score:</Counter>
                <h2>casino</h2>
                <div className={styles.croupierCardsPackage} id="casinoCardsPackage">
                    <div id="casinoPointCounter"></div>
                </div>
            </div>
            <PlayerCards></PlayerCards>
            <Counter points={this.state.playerRoundScore}>player score:</Counter>

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