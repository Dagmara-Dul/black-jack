import React from 'react';
import PropTypes from "prop-types";
import styles from './PlayerCards.module.scss';

const PlayerCards = ({ children, chip, ...props})=>{

const chipClass = chip ? styles.chip : styles.actionBtnClass

    return(
        <div className={styles.playerPackage}>
                <h2>karty gracza</h2>
                <div className={styles.playerCardsPackage} id="playerCardsPackage"></div>
        </div>
    )
};

// Button.PropTypes = {
//     href: PropTypes.string,
//     secondary: PropTypes.bool,
// }

export default PlayerCards;