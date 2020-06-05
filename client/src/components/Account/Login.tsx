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

  const handleLoginFormID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      id: e.target.value
    });
  }

  const handleLoginFormPWD = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      password: e.target.value
    });
  }

  const handleRegisterFormID = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      id: e.target.value
    });
  }

  const handleRegisterFormPWD = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      password: e.target.value
    });
  }

  const handleRegisterFormName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterForm({
      ...registerForm,
      name: e.target.name
    });
  }

  const handleLoginSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

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
      location.assign('/home');
    })
    .catch(err => console.log(err));
  }

  const handleRegisterSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  }

  return (
    <Container maxWidth="md">
      <StylesProvider injectFirst>
        <Title>계정</Title>
        <Company></Company>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LoginBox>
              <LoginBoxTitle>
                로그인
              </LoginBoxTitle>

              <LoginForm>
                <LoginInput 
                  placeholder="아이디"
                  name="id"
                  value={loginForm.id}
                  onChange={handleLoginFormID}
                />
                <LoginInput 
                  placeholder="패스워드"
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginFormPWD}
                />
                <LoginButton onClick={handleLoginSubmit}>
                  로그인
                </LoginButton>

              </LoginForm>
              
            </LoginBox>
          </Grid>
          <Grid item xs={6}>
            <LoginBox>
              <LoginBoxTitle>
                회원가입
              </LoginBoxTitle>

              <LoginForm>
                <LoginInput 
                  placeholder="아이디"
                  name="id"
                  value={registerForm.id}
                  onChange={handleRegisterFormID}
                />
                <LoginInput 
                  placeholder="패스워드"
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterFormPWD}
                />
                <LoginInput 
                  placeholder="업체명"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterFormName}
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