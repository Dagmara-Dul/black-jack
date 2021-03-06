import React from 'react';
import { Link } from 'react-router-dom';
import Bankbet from '../../components/Bankbet/Bankbet'
import Button from '../../components/Button/Button';
import Chip from '../../components/Chip/Chip';
import styles from './Bet.module.scss';



class Bet extends React.Component {

    state={
        bank: 1000,
        bet: 0,
        dealBtn: false
    }

    

   addToBet =(value)=>{
    
        this.setState((prevState) => ({bet: prevState.bet + value,dealBtn:true}))
        this.setState((prevState) => ({bank: prevState.bank - value}))
        if(this.state.bet ==! 0) {this.setState({dealBtn:true})}
        
    }

    goToGame = () =>{
        
        var bankValue = this.state.bank;
        var betValue = this.state.bet;
        console.log("bank: " + bankValue + " bet: " +betValue)
        var bankAndBetValues = {bank: bankValue, bet:betValue}
        sessionStorage.setItem('bankAndBetValues',JSON.stringify(bankAndBetValues));
       
    }

    render(){
        const btnClass = this.state.dealBtn ? styles.visible : styles.invisible;
        return(
            <div className={styles.betPackage}>
                <Bankbet bankValue={this.state.bank} betValue={this.state.bet}></Bankbet>
                <div className={styles.instructionPackage}>
                    <h1>Please place a bet</h1>
                </div>
                <div className={styles.betBtnPackage}>               
                    <Button className={btnClass} onClick={() => this.goToGame()}><Link className={styles.linkStyle} to="/game">Deal</Link></Button>
                    <div className={styles.sumPackage} id="sumCounter">
                        ${this.state.bet}
                    </div>
                    <div className={styles.chipsPackage}>
                        <Chip chip onClick={() => this.addToBet(5)}>$5</Chip>
                        <Chip chip onClick={() => this.addToBet(10)}>$10</Chip>
                        <Chip chip onClick={() => this.addToBet(25)}>$25</Chip>
                        <Chip chip onClick={() => this.addToBet(100)}>$100</Chip>

                    </div>
                </div>
            </div>
        )
    }
}

export default Bet;

