import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Route } from 'react-router-dom';
import Edit from './Edit';
import LinearProgress from '@material-ui/core/LinearProgress';
import Axios from 'axios';

interface MatchParams {
  id: string;
}

const EditRouter: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const [bill, setBill] = useState<Form>({
    date: new Date(),
    people: 1,
    representative: "",
    order: [],
    service: [],
    memo: "",
    total: 0
  });
  const [isFetched, setIsFetched] = useState<boolean>(false);

  if (!sessionStorage.getItem('companyID')) {
    location.assign('/login');
  }

  useEffect(() => {
    Axios({
      method: 'get',
      url: `/api/bills/${match.params.id}`
    })
    .then(res => {
      if (res.data.fail === 1) {
        alert('존재하지 않는 계산서입니다.');
        location.assign('/bills');
      }

      setBill({
        date: res.data.date,
        people: res.data.people,
        representative: res.data.representative,
        order: res.data.order,
        service: res.data.service,
        memo: res.data.memo,
        total: res.data.total
      });
      setIsFetched(true);
    })
  }, []);

  return (
    isFetched ? <Edit editMode={true} billID={match.params.id} billFormToEdit={bill}/> : <LinearProgress />
  )
}

export default EditRouter;