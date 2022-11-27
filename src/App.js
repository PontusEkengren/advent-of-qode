import './App.css';
import React, { useState, useEffect } from 'react';
import { Header, Body, ContainerCenterColumn, FlexContainer } from './Styled/defaults';
import { Title } from './Styled/christmas';
import LeaderBoard from './LeaderBoard';
import Tree from './Tree.js';
import * as api from './api.js';
import GoogleAuth from './GoogleAuth';
import * as storage from './storage';
import { Route, BrowserRouter } from 'react-router-dom';
import AdminView from './AdminView';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const { REACT_APP_CLIENT_ID } = process.env;

function App() {
  const [userScore, setUserScore] = useState([]);
  const [profileObj, setProfileObj] = useState();
  const [isLogined, setIsLogined] = storage.useLocalStorage('isLogined', false);
  const [accessToken, setAccessToken] = storage.useLocalStorage('googleId', '');
  const [accessIdToken, setAccessIdToken] = storage.useLocalStorage('accessIdToken', undefined);
  const [name, setName] = storage.useLocalStorage('name', '');
  const [email, setEmail] = storage.useLocalStorage('email', '');
  const [imageUrl, setImageUrl] = storage.useLocalStorage('imageUrl', undefined);

  useEffect(() => {
    api.getUserScore(email).then((response) => {
      setUserScore(response.data);
    });
  }, [email]);

  useEffect(() => {
    console.log('profileObj', profileObj);
  }, [profileObj]);

  const login = (response) => {
    if (response.accessToken) {
      setProfileObj(response.profileObj);
      setIsLogined(true);
      setAccessIdToken(response.tokenId);
      setAccessToken(response.profileObj.email); //Todo Change to tokens //https://developers.google.com/identity/sign-in/web/backend-auth
      setName(response.profileObj.name);
      setEmail(response.profileObj.email);
      setImageUrl(response.profileObj.imageUrl);
    }
  };

  const logout = (response) => {
    setIsLogined(false);
    setAccessToken('');
    setAccessIdToken('');
    setName('');
    setImageUrl('');
  };

  const handleLoginFailure = (response) => {
    console.log('handleLoginFailure', response);
  };

  const handleLogoutFailure = (response) => {
    console.log('Failed to log out', response);
  };

  const handleSubmit = (time, day, token) => {
    const data = {
      userId: accessToken,
      score: time,
      email: email,
      question: day,
    };

    api
      .createUserScore(data)
      .then((response) => {
        // setQuestionOfTheDay(response.data.question);
        // setReady(true);
        // start();
        setTimeout(() => window.location.reload(false), 2200);
      })
      .catch((e) => {
        console.log('error', e);
        // setQuestionOfTheDay('Unable to fetch data from database');
      });
  };

  const refreshAccess = () => {
    logout();
  };

  const theme = createMuiTheme({ palette: { type: 'dark' } });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header>
          <Title>Advent of Qode</Title>
          {name && <span>Welcome {name}</span>}
          {!name && <span>Login with google to play</span>}
        </Header>
        <Body>
          <FlexContainer>
            <BrowserRouter>
              <Route path='/admin'>
                <AdminView token={accessIdToken} onTokenRefresh={refreshAccess}></AdminView>
              </Route>
              <Route exact path='/'>
                <Tree userData={userScore} disabled={!isLogined} onSubmit={handleSubmit} token={accessIdToken} />
              </Route>
            </BrowserRouter>
            <ContainerCenterColumn>
              <GoogleAuth
                imageUrl={imageUrl}
                isLogined={isLogined}
                clientId={REACT_APP_CLIENT_ID}
                handleSuccess={login}
                onLogoutSuccess={logout}
                onLogOutFailure={handleLogoutFailure}
                onLogInFailure={handleLoginFailure}
              />
              <LeaderBoard />
            </ContainerCenterColumn>
          </FlexContainer>
        </Body>
      </ThemeProvider>
    </>
  );
}

export default App;
