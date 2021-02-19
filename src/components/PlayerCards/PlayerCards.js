import React from 'react';
import PropTypes from "prop-types";
import styles from './PlayerCards.module.scss';

const PlayerCards = ({ children, chip, ...props})=>{

    return(
        <div className={styles.playerPackage}>
                <div className={styles.playerCardsPackage} id="playerCardsPackage"></div>
                <h2 className={styles.h2}>player</h2>
        </div>
    )
};

// Button.PropTypes = {
//     href: PropTypes.string,
//     secondary: PropTypes.bool,
// }

export default PlayerCards;