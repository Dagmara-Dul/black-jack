import React from "react";
import styles from "./Game.module.scss";
import PlayerCards from "../../components/PlayerCards/PlayerCards";
import Chip from "../../components/Chip/Chip";
import Button from "../../components/Button/Button";
import Bankbet from "../../components/Bankbet/Bankbet";
import Counter from "../../components/Counter/Counter";
import cardBack from "../../media/cardBack.png";
import Modal from '../../components/Modal/Modal'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      deckKey: "",
      playerCards: [],
      casinoCards: [],
      playerRoundCardsValues: 0,
      casinoRoundCardsValues: 0,
      playerRoundScore: 0,
      casinoRoundScore: 0,
      bank: 0,
      bet: 0,
      deal: 0,
      isModalOpen:false,
      message:''

    };
  }

  addPoints = (whoseScore) => {
    if (this.state[`${whoseScore}RoundCardsValues`]) {
      var cardsNames = this.state[`${whoseScore}RoundCardsValues`];
      var cardsScores = cardsNames.map(function (singleCard) {
        if (
          singleCard === "QUEEN" ||
          singleCard === "KING" ||
          singleCard === "JACK"
        ) {
          return 10;
        } else if (singleCard === "ACE") {
          return 11;
        } else {
          return parseInt(singleCard, 10);
        }
      });

      return cardsScores.reduce((a, b) => a + b, 0);
    }
  };

  showHiddenCard = (placeId) => {
    let cardPackage = document.getElementById(placeId);
    if (cardPackage) {
      cardPackage.insertAdjacentHTML(
        "beforeend",
        `<div id='cardBack' class=${styles.cards}> <img class=${styles.cardBack} src=${cardBack} /></div>`
      );
    }
  };

  showCards = (placeId, whoseCard) => {
    let cardPackage = document.getElementById(placeId);
    whoseCard.map(function (card) {
      cardPackage.insertAdjacentHTML(
        "beforeend",
        `<div class=${styles.cards}> <img class=${styles.cardImage} src='${card}' /></div>`
      );
    });
  };

  createActionButtons = () => {
    document.getElementById("actionBtnPackage").style.display = "block";
  };

  removeButton = (id) => {
    document.getElementById(id).style.display = "none";
  };

  getBankAndBetValues = (counter) => {
    let bankAndBetValues = sessionStorage.getItem("bankAndBetValues");
    bankAndBetValues = JSON.parse(bankAndBetValues);

    this.setState({ bank: bankAndBetValues.bank, bet: bankAndBetValues.bet });
    if (counter === "bank") {
      return bankAndBetValues.bank;
    } else {
      return bankAndBetValues.bet;
    }
  };

  dealCards = (howMany, toWhom) => {
    if (this.state.deckKey !== "") {
      return fetch(
        `https://deckofcardsapi.com/api/deck/${this.state.deckKey}/draw/?count=${howMany}`, //wybieranie kart z określonej puli talii
        {
          "Content-Type": "application/json",
          Accept: "application/json",
        }
      )
        .then((data) => data.json())
        .then((cardDetails) => {
          return this.setState({
            [`${toWhom}Cards`]: cardDetails.cards.map(function (e) {
              return e.image;
            }),
            [`${toWhom}RoundCardsValues`]: cardDetails.cards.map(function (e) {
              return e.value;
            }),
          });
        })
        .then(() => {
          this.showCards(`${toWhom}CardsPackage`, this.state[`${toWhom}Cards`]);
          if (this.state.deal < 2 && toWhom == "casino") {
            this.showHiddenCard(`${toWhom}CardsPackage`);
          }
        })
        .then(() => {
          this.setState((prevState) => ({
            [`${toWhom}RoundScore`]:
              prevState[`${toWhom}RoundScore`] + this.addPoints(toWhom),
          }));
          return this.state[`${toWhom}RoundScore`];
        });
    } else {
      console.log("can't deal cards, there is no deck chosen");
    }
  };

  startGame = () => {
    this.countDeals();
    console.log(this.state.deal);
    this.getBankAndBetValues();

    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6") //tasowanie kart
      .then((newDeck) => {
        return newDeck.json();
      })
      .then((data) => {
        this.setState({ deckKey: data.deck_id });
        return this.state.deckKey;
      })
      .then(() => {
        const playerCards = "player";
        this.dealCards(2, playerCards);
      })
      .then(() => {
        const playerCards = "player";
        this.checkScore(playerCards);
      })
      .then(() => {
        const casinoCards = "casino";
        this.dealCards(1, casinoCards);
      })
      .catch((err) => console.log(err));
    this.removeButton("initiateGame");
    this.createActionButtons();
  };

  countDeals = () => {
    this.setState((prevState) => ({ deal: prevState.deal + 1 }));
    if(this.state.deal >= 1 ){
      this.removeButton('doublePackage')
    }
  };

  
  double = () =>{
    this.countDeals();
    const betValue = this.state.bet
    this.setState((prevState)=>({
      bet: prevState.bet + prevState.bet, 
      bank: prevState.bank - betValue
    })) 
  }

  stand = () => {
    this.countDeals();
    console.log(this.state.deal);
    document.getElementById("cardBack").style.display = "none";
    const casinoCards = "casino";
    
    this.dealCardsDuringStand(this.dealCards, 1, casinoCards);
  };

  dealCardsDuringStand = async (fn, nrOfCards, cardsOwner) => {
    try {
      const dealCardsDuringSt = await fn(nrOfCards, cardsOwner);
      // console.log("here" + dealCardsDuringSt);
      let casinoScore = this.checkScore('casino');
      let playerScore = this.checkScore('player')
      this.compareTheResults(casinoScore,playerScore)
      if (dealCardsDuringSt >= 17) {
        console.log("koniec");
        this.compareTheResults(casinoScore,playerScore)
      }else {
        console.log(this.dealCardsDuringStand(fn, nrOfCards, cardsOwner));
        console.log(dealCardsDuringSt)
      }
    } catch (err) {
      console.log(Error(err));
    }
  };

  checkScore = (whose) => {
    let score = this.state[`${whose}RoundScore`];
    return score;
  };

  compareTheResults = (casinoScore,playerScore) =>{
    
    const winMessage = "You've just won!"
    const lossMessage = "You lost"
    const drawMessage = "draw - try again" 
    if (playerScore === 21 && casinoScore===21){
      this.openModal() 
      this.addText(drawMessage)
    }else if (playerScore===21 && casinoScore>21){
      this.openModal() 
      this.addText(winMessage)
    } else if(playerScore===21 && casinoScore<21 && casinoScore>17){
      this.openModal() 
      this.addText(winMessage)
    } else if(casinoScore===21 && playerScore<21 && playerScore>17){
      this.openModal() 
      this.addText(lossMessage)
    }else if (casinoScore===21 && playerScore>21){
      this.openModal() 
      this.addText(lossMessage)
    }else if (playerScore<casinoScore && casinoScore<21){
      this.openModal() 
      this.addText(lossMessage)
    }
  }

  openModal = () => {
    this.setState ({
      isModalOpen: true,
    })
  }

  closeModal = () => {
    this.setState ({
      isModalOpen: false,
    })
  }

  addText = (text)=>{
    this.setState({
      message:text
    })
  }

  render() {
    const { isModalOpen } = this.state;
    return (
      <>
      { isModalOpen && <Modal closeModalFn={this.closeModal} text={this.state.message} btnText="następna runda"></Modal> }
        <Bankbet
          bankValue={this.state.bank}
          betValue={this.state.bet}
        ></Bankbet>

        <div className={styles.croupiePackage}>
          <Counter points={this.state.casinoRoundScore}>casino score:</Counter>
          <h2 className={styles.h2}>casino</h2>
          <div className={styles.croupierCardsPackage} id="casinoCardsPackage">
            <div id="casinoPointCounter"></div>
          </div>
        </div>
        <div className={styles.startBtn}>
          <Button id="initiateGame" onClick={() => this.startGame()}>
            start
          </Button>
        </div>
        <PlayerCards></PlayerCards>
        <Counter points={this.state.playerRoundScore}>player score:</Counter>
        {/* { isModalOpen && <Modal closeModalFn={this.closeModal} text={this.state.message}></Modal> } */}
        <div className={styles.actionBtnPackage} id="actionBtnPackage">
          <div className={styles.actionBtn} id="doublePackage">
            <Chip id="double" onClick={()=> this.double()}>Double</Chip>
          </div>
          <div className={styles.actionBtn} id="hitPackage">
            <Chip>Hit</Chip>
          </div>
          <div className={styles.actionBtn} id="standPackage">
            <Chip id="stand" onClick={() => this.stand()}>
              Stand
            </Chip>
          </div>
        </div>
        
      </>
    );
  }
}

export default Game;
