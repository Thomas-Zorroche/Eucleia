import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { AccueilPage } from '../pages/AccueilPage';
import { VirementPage } from '../pages/VirementsPage';
import { GraphiquePage } from '../pages/GraphiquesPage';
import { AddTransferPage } from '../pages/AddTransferPage';

export const Main = () => {
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}

      <Route exact path='/' component={AccueilPage}></Route>

      <Route exact path='/virements' component={VirementPage}></Route>

      <Route exact path='/addTransfer' component={AddTransferPage}></Route>

      <Route exact path='/graphiques' component={GraphiquePage}></Route>
      
    </Switch>
  );
}
