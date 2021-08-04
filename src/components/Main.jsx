import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';

import { LoginPage } from '../pages/LoginPage';
import { AccueilPage } from '../pages/AccueilPage';
import { VirementPage } from '../pages/VirementsPage';
import { GraphiquePage } from '../pages/GraphiquesPage';
import { AddTransferPage } from '../pages/AddTransferPage';
import { UserPage } from '../pages/UserPage';
import { OptionPage } from '../pages/OptionPage';


export const Main = ({ usersDatas, dateFilter, showExpanses }) => {

  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}

      <Route exact path='/login' component={LoginPage}></Route>

      <ProtectedRoute exact path='/' component={AccueilPage}></ProtectedRoute>

      <ProtectedRoute exact path='/virements' component={VirementPage} usersDatas={usersDatas} dateFilter={dateFilter} showExpanses={showExpanses} ></ProtectedRoute>

      <ProtectedRoute exact path='/addTransfer' component={AddTransferPage}></ProtectedRoute>

      <ProtectedRoute exact path='/graphiques' component={GraphiquePage} usersDatas={usersDatas} dateFilter={dateFilter} showExpanses={showExpanses}></ProtectedRoute>

      <ProtectedRoute exact path='/user' component={UserPage}></ProtectedRoute>

      <ProtectedRoute exact path='/option' component={OptionPage}></ProtectedRoute>
      
    </Switch>
  );
}
