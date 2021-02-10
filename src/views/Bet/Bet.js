import React from 'react';
// import Button from '../../components/Button/Button';
import Button from '../../components/Button/Button';
import Chip from '../../components/Chip/Chip';
import styles from './Bet.module.scss';


class Bet extends React.Component {
   addToBet =()=>{
        console.log('klik')
        var betSumCounter = document.getElementById('#sumCounter')
        console.log(betSumCounter)
    }
    render(){
        
        return(
            <div className={styles.betPackage}>
                <div className={styles.countersPackage}>
                    <div className={styles.bankCounterPackage}>Bank</div>
                    <div className={styles.betCounterPackage}>Bet</div>
                </div>
                <div className={styles.instructionPackage}>
                    <h1>Instructions</h1>
                    <p>here comes intructions</p>
                </div>
                <div className={styles.betBtnPackage}>
                    <Button>Play</Button>
                    <div className={styles.sumPackage} id="sumCounter">
                        sum comes here
                    </div>
                    <div className={styles.chipsPackage}>
                        <Chip onClick={this.addToBet}>$5</Chip>
                        <Chip>$10</Chip>
                        <Chip>$25</Chip>
                        <Chip>$100</Chip>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bet;