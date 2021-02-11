import React from 'react';
import { Link } from 'react-router-dom';
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
    }

    render(){
        const btnClass = this.state.dealBtn ? styles.visible : styles.invisible;
        return(
            <div className={styles.betPackage}>
                <div className={styles.countersPackage}>
                    <div className={styles.bankCounterPackage}>Bank: ${this.state.bank}</div>
                    <div className={styles.betCounterPackage}>Bet: ${this.state.bet}</div>
                </div>
                <div className={styles.instructionPackage}>
                    <h1>Please place a bet</h1>
                </div>
                <div className={styles.betBtnPackage}>
                    <Button className={btnClass} onClick={() => this.goToGame()}><Link className={styles.linkStyle} to="/game">Deal</Link></Button>
                    <div className={styles.sumPackage} id="sumCounter">
                        ${this.state.bet}
                    </div>
                    <div className={styles.chipsPackage}>
                        <Chip onClick={() => this.addToBet(5)}>$5</Chip>
                        <Chip onClick={() => this.addToBet(10)}>$10</Chip>
                        <Chip onClick={() => this.addToBet(25)}>$25</Chip>
                        <Chip onClick={() => this.addToBet(100)}>$100</Chip>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bet;