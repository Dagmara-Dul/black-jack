import React from 'react';
import Button from '../../components/Button/Button';
import styles from './Start.module.scss';

class Start extends React.Component {
    
    render(){
        return(
            <div className={styles.start}>
                <h1>Black Jack</h1>
                <Button href="/Bet">Start Game</Button>
            </div>
        )
    }
}

export default Start;