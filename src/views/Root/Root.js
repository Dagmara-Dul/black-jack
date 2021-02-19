import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Start from '../Start/Start';
import Bet from '../Bet/Bet';
import Game from '../Game/Game';

class Root extends React.Component {
    render(){return(
        <BrowserRouter>
            
                <Switch>
                    <Route exact path='/'component={Start} />
                    <Route path='/bet'component={Bet} />
                    <Route path='/game' component={Game} />
                </Switch>
            
        </BrowserRouter>
    )     
    }
}

export default Root;