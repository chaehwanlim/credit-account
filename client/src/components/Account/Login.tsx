import React, { useState } from 'react';
import { PageTitle, PageSubtitle, CenteredBox, CenteredBoxTitle, StyledInput, LoginButton, LoginForm } from '../styled';
import Container from '@material-ui/core/Container';
import { StylesProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';

interface LoginForm {
  id: string;
  password: string;
}

interface RegisterForm {
  id: string;
  password: string;
  name: string;
  location: string;
}

const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    id: "",
    password: ""
  });
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    id: "",
    password: "",
    name: "",
    location: ""
  });

  const handleLoginForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  }

  const handleRegisterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
  }

  const handleLoginSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginForm.id === '') {
      alert('아이디를 입력해주세요');
      return;
    }
    if (loginForm.password === '') {
      alert('패스워드를 6자 이상 입력해주세요');
      return;
    }

    Axios({
      method: 'post',
      url: '/api/users',
      data: {
        id: loginForm.id,
        password: loginForm.password
      }
    })
    .then(res => {
      if (res.data.code === 200) {
        sessionStorage.setItem('name', res.data.user.name);
        sessionStorage.setItem('companyID', res.data.user.companyID);
        alert(res.data.alert);
        location.assign('/');
      } else {
        alert(res.data.alert);
      }
    })
    .catch(err => console.log(err));
  }

  const handleRegisterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (registerForm.id === '') {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (registerForm.password.length < 6) {
      alert('패스워드를 6자 이상 입력해주세요.');
      return;
    }
    if (registerForm.name === '') {
      alert('업체명을 입력해주세요.');
      return;
    }

    Axios({
      method: 'post',
      url: '/api/users/register',
      data: {
        id: registerForm.id,
        password: registerForm.password,
        name: registerForm.name
      }
    })
    .then(res => {
      if (res.data.code === 200) {
        sessionStorage.setItem('name', res.data.user.name);
        sessionStorage.setItem('companyID', res.data.user.companyID);
        alert(res.data.alert);
        location.assign('/');
      } else {
        alert(res.data.alert);
      }
    })
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>
        <PageTitle>계정</PageTitle>
        <PageSubtitle></PageSubtitle>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CenteredBox>
              <CenteredBoxTitle>
                로그인
              </CenteredBoxTitle>


              <LoginForm noValidate onSubmit={handleLoginSubmit}>
                <StyledInput 
                  placeholder="아이디"
                  name="id"
                  value={loginForm.id}
                  onChange={handleLoginForm}
                />
                <StyledInput 
                  placeholder="패스워드"
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginForm}
                />
                <LoginButton big colored type="submit">
                  로그인
                </LoginButton>

              </LoginForm>
              
            </CenteredBox>
          </Grid>
          <Grid item xs={12}>
            <CenteredBox>
              <CenteredBoxTitle>
                회원가입
              </CenteredBoxTitle>

              <LoginForm noValidate onSubmit={handleRegisterSubmit}>
                <StyledInput 
                  placeholder="아이디"
                  name="id"
                  value={registerForm.id}
                  onChange={handleRegisterForm}
                />
                <StyledInput 
                  placeholder="패스워드"
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterForm}
                />
                <StyledInput 
                  placeholder="업체명"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterForm}
                />
                <LoginButton big colored sub type="submit">
                  회원가입
                </LoginButton>

              </LoginForm>

            </CenteredBox>
          </Grid>
        </Grid>
      </StylesProvider>
    </Container>
  )
}

export default Login;