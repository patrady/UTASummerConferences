import React from 'react';
import { Route, Switch } from 'react-router-dom'
import StaffHomepage from '../Pages/Staff/StaffHomepage';
import Camps_List from '../Pages/Camps/Camps_List';
import Camps_Homepage from '../Pages/Camps/Homepage';
import Camps_Equipment from '../Pages/Camps/Equipment';
import Camps_Billing from '../Pages/Camps/Billing2';

const Error = () => {
    return (
        <div>
            <p>Error!</p>
        </div>
    )
}

export default (
    <Switch>
        <Route path='/' component={StaffHomepage} exact />
        <Route path='/camps' component={Camps_List} exact/>
        <Route path='/camps/homepage' component={Camps_Homepage} />
        <Route path='/camps/equipment' component={Camps_Equipment} />
        <Route path='/camps/billing' component={Camps_Billing}/>
        <Route component={Error} />
    </Switch>
)