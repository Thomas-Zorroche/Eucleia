import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom"

import { BaseButton } from '../components/ui/BaseButton';


export const SubscriptionPage = ({ usersDatas, dateFilter }) => {

  return (
    <div id="Page">
      <h1>Abonnements</h1>

      <Link to="/addSubscription">
        <BaseButton label={"Ajouter un Abonnement"} />
      </Link>

    </div>
  )

}
