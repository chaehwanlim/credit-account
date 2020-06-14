import React from 'react';
import { RouteComponentProps, Route } from 'react-router-dom';
import Bill from './Bill';
import Edit from '../Edit/Edit';
import EditRouter from '../Edit/EditRouter';

import { useDispatch } from 'react-redux';
import { setTitle } from '../../modules/title';

interface MatchParams {
  id: string;
}

const BillRouter: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const dispatch = useDispatch();

  const _setTitle = (title: string) => {
    dispatch(setTitle(title));
  }

  if (!sessionStorage.getItem('companyID')) {
    location.assign('/login');
  }

  return (
    <div>
      <Route exact path={`${match.path}`} render={() => <Bill setTitle={_setTitle} />} />
      <Route exact path={`${match.path}/new`} render={() => <Edit setTitle={_setTitle} />} />
      <Route exact path={`${match.path}/editor/:id`} component={EditRouter} />
    </div>
  )
}

export default BillRouter;