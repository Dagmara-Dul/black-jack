import React from 'react';
import styles from './Counter.module.scss';


const Counter = ({ children, points, ...props})=>{

    return(     
        <div className={styles.counterClass} {...props}>
            {children} {points}
        </div>
    )
};



// class Counter extends React.Component {
//     render(){
//         return(
//             <div className={styles.counterClass}>I'm counter</div>
//         )
//     }
// }

export default Counter;
