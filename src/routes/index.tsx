//App's Routes
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/home';
import Repository from '../pages/repository';


const Routes: React.FC = () => {
    return(

        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/repo" component={Repository} />
        </Switch>
        
    )
}

export default Routes;