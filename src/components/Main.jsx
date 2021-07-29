import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import { LoginPage } from '../pages/LoginPage';
import { AccueilPage } from '../pages/AccueilPage';
import { VirementPage } from '../pages/VirementsPage';
import { GraphiquePage } from '../pages/GraphiquesPage';
import { AddTransferPage } from '../pages/AddTransferPage';
import { UserPage } from '../pages/UserPage';

export const Main = ({ usersDatas, dateFilter }) => {

  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}

      <Route exact path='/login' component={LoginPage}></Route>

      <ProtectedRoute exact path='/' component={AccueilPage}></ProtectedRoute>

      <ProtectedRoute exact path='/virements' usersDatas={usersDatas} dateFilter={dateFilter} component={VirementPage}></ProtectedRoute>

      <ProtectedRoute exact path='/addTransfer' component={AddTransferPage}></ProtectedRoute>

      <ProtectedRoute exact path='/graphiques' component={GraphiquePage}></ProtectedRoute>

      <ProtectedRoute exact path='/user' component={UserPage}></ProtectedRoute>

      
    </Switch>
  );
}
