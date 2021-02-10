import React from 'react';
import PropTypes from "prop-types";
import styles from './Button.module.scss';

const Button = ({ children, href, secondary, ...props})=>{

    const buttonClass = secondary ? styles.secondary : styles.button;

    return(
        <>
            {
                href ? (
                    <a
                    href={href}
                    // target="blank"
                    className={buttonClass}
                    rel="noopener noreferrer"
                    >
                        {children}
                    </a>
                ) : (
                    <button className={buttonClass} {...props}>
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