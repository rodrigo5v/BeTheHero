import React  from 'react';
/*BrowserRouter>Route>Switch são as maneiras de identificação
*de cada pagina do meu site sendo no switch que determino o diretório*/
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//Exporto as rotas necessárias para identificar cada pagina no navegador
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}