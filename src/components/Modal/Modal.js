import React from 'react';
import styles from './Modal.module.scss';
// import Form from '../Form/Form';

const Modal = ( { closeModalFn, text, btnText }) => (
    <div className={styles.bodyModal}>
        <div className={styles.wrapper}>
            <button className={styles.closeButton} onClick={closeModalFn} >{btnText}</button>
            {/* <Form /> */}
            <div>{text}</div>
        </div>
    </div>
);

export default Modal;