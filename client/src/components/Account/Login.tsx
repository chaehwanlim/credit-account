import React, { useState, useEffect } from 'react';
import { Title, Company, LoginBox, LoginBoxTitle, LoginInput, LoginButton, RegisterButton, LoginForm } from '../styled';
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

  const handleLoginSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      sessionStorage.setItem('name', res.data[0].name);
      sessionStorage.setItem('companyID', res.data[0].companyID);
      location.assign('/');
    })
    .catch(err => console.log(err));
  }

  const handleRegisterSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (registerForm.id === '') {
      alert('아이디를 입력해주세요');
      return;
    }
    if (registerForm.password.length < 6) {
      alert('패스워드를 6자 이상 입력해주세요');
      return;
    }
    if (registerForm.name === '') {
      alert('업체명을 입력해주세요');
      return;
    }
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>
        <Title>계정</Title>
        <Company></Company>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LoginBox>
              <LoginBoxTitle>
                로그인
              </LoginBoxTitle>

              <LoginForm>
                <LoginInput 
                  placeholder="아이디"
                  name="id"
                  value={loginForm.id}
                  onChange={handleLoginForm}
                />
                <LoginInput 
                  placeholder="패스워드"
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginForm}
                />
                <LoginButton onClick={handleLoginSubmit}>
                  로그인
                </LoginButton>

              </LoginForm>
              
            </LoginBox>
          </Grid>
          <Grid item xs={12}>
            <LoginBox>
              <LoginBoxTitle>
                회원가입
              </LoginBoxTitle>

              <LoginForm>
                <LoginInput 
                  placeholder="아이디"
                  name="id"
                  value={registerForm.id}
                  onChange={handleRegisterForm}
                />
                <LoginInput 
                  placeholder="패스워드"
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterForm}
                />
                <LoginInput 
                  placeholder="업체명"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterForm}
                />
                <RegisterButton onClick={handleRegisterSubmit}>
                  회원가입
                </RegisterButton>

              </LoginForm>

            </LoginBox>
          </Grid>
        </Grid>
      </StylesProvider>
    </Container>
  )
}

export default Login;