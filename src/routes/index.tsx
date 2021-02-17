//App's Routes
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/home';
import Repository from '../pages/repository';


const Routes: React.FC = () => {
    return(

        <Switch>
            <Route path="/" exact component={Home} />
            {/* Adicionando o restante dos parametros */}
            <Route path="/repository/:repository+" component={Repository} />
        </Switch>
        
    )
}

export default Routes;