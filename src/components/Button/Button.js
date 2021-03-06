import React from 'react';
import PropTypes from "prop-types";
import styles from './Button.module.scss';

const Button = ({ children, href, secondary, ...props})=>{


    return(
        <>
            {
                href ? (
                    <a
                    href={href}
                    className={styles.button}
                    rel="noopener noreferrer"
                    >
                        {children}
                    </a>
                ) : (
                    <button className={styles.button} {...props}>
                        {children}
                    </button>
                )
            }
        </>
    )
};

// Button.PropTypes = {
//     href: PropTypes.string,
//     secondary: PropTypes.bool,
// }

export default Button;