import React from 'react';
import PropTypes from "prop-types";
import styles from './Chip.module.scss';

const Chip = ({ children, chip, ...props})=>{

const chipClass = chip ? styles.chip : styles.actionBtnClass

    return(
        <>
            {
                
                <button className={chipClass} {...props}>
                    {children}
                </button>
                
            }
        </>
    )
};

// Button.PropTypes = {
//     href: PropTypes.string,
//     secondary: PropTypes.bool,
// }

export default Chip;