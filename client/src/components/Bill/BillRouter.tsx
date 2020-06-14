import React from 'react';
import { RouteComponentProps, Route } from 'react-router-dom';
import Bill from './Bill';
import Edit from '../Edit/Edit';
import EditRouter from '../Edit/EditRouter';

interface MatchParams {
  id: string;
}

const BillRouter: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  if (!sessionStorage.getItem('companyID')) {
    location.assign('/login');
  }

  return (
    <div>
      <Route exact path={`${match.path}`} component={Bill} />
      <Route exact path={`${match.path}/new`} component={Edit} />
      <Route exact path={`${match.path}/editor/:id`} component={EditRouter} />
    </div>
  )
}

export default BillRouter;