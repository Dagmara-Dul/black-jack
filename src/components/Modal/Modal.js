import React from 'react';
import styles from './Modal.module.scss';
import Button from '../Button/Button'
// import Form from '../Form/Form';

const Modal = ( { closeModalFn, text, lastRound, nextRoundFn, newGameFn, finishGameFn }) => (
    <div className={styles.bodyModal}>
        <div className={styles.wrapper}>
            {
                lastRound ? (
                    <h3>Game over</h3>
                ) : (
                    <h3>Go on</h3>
                )
            }
            <div>{text}</div>
            {
                lastRound ? (
                    // <button className={styles.btnText} onClick={nextRoundFn} >następna runda</button>
                    <Button onClick={nextRoundFn}>nastepna runda</Button>
                ) : (
                    <div className={styles.btnPackage}>
                        {/* <button className={styles.btnText} onClick={newGameFn} >graj od nowa</button> */}
                        <Button  onClick={newGameFn} >graj od nowa</Button>
                        {/* <button className={styles.btnText} onClick={finishGameFn} >zakończ grę</button> */}
                        <Button  onClick={finishGameFn} >zakończ grę</Button>
                        
                    </div>
                )
            }
            {/* <button className={styles.closeButton} onClick={closeModalFn} ></button>
            <button className={styles.btnText} onClick={nextRoundFn} >{btnText}</button> */}
            
        </div>
    </div>
);

export default Modal;