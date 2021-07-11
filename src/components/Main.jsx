import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AcceuilPage } from '../pages/AcceuilPage';
import { VirementPage } from '../pages/VirementsPage';
import { GraphiquePage } from '../pages/GraphiquesPage';
import { AddTransfertPage } from '../pages/AddTransfertPage';

export const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}

      <Route exact path='/' component={AcceuilPage}></Route>

      <Route exact path='/virements' component={VirementPage}></Route>

      <Route exact path='/addTransfert' component={AddTransfertPage}></Route>

      <Route exact path='/graphiques' component={GraphiquePage}></Route>
      
    </Switch>
  );
}
