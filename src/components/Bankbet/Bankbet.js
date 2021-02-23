import React from 'react';
import PropTypes from "prop-types";
import styles from './Bankbet.module.scss';

const Bankbet = ({ children, bankValue, betValue, ...props})=>{



    return(
        <>
            {
                
                // <button className={chipClass} {...props}>
                //     {children}
                // </button>
                <div className={styles.countersPackage}>
                    <div className={styles.bankCounterPackage}>Bank: ${bankValue}</div>
                    <div className={styles.betCounterPackage}>Bet: ${betValue}</div>
                </div>
                
            }
        </>
    )
};

// Button.PropTypes = {
//     href: PropTypes.string,
//     secondary: PropTypes.bool,
// }

export default Bankbet;