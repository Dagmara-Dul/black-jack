import React from 'react';
import PropTypes from "prop-types";
import styles from './Chip.module.scss';

const Chip = ({ children, secondary, ...props})=>{

    return(
        <>
            {
                
                <button className={styles.chipClass} {...props}>
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