import './App.css';
import React, { useState, useEffect } from 'react';
import { Header, Body, ContainerCenterColumn } from './Styled/defaults';
import { Title } from './Styled/christmas';
import LeaderBoard from './LeaderBoard';
import Tree from './Tree.js';
import * as api from './api.js';
import GoogleAuth from './GoogleAuth';
import * as storage from './storage';
const { REACT_APP_CLIENT_ID } = process.env;

function App() {
  const [userScore, setUserScore] = useState([]);
  const [isLogined, setIsLogined] = storage.useLocalStorage('isLogined', false);
  const [accessToken, setAccessToken] = useState('');
  const [name, setName] = storage.useLocalStorage('name', '');
  const [imageUrl, setImageUrl] = storage.useLocalStorage('imageUrl', undefined);

  useEffect(() => {
    api.getUserScore().then((response) => {
      setUserScore(response.data);
    });
  }, []);

  const login = (response) => {
    if (response.accessToken) {
      setIsLogined(true);
      setAccessToken(response.accessToken);
      setName(response.profileObj.name);
      setImageUrl(response.profileObj.imageUrl);
    }
  };

  const logout = (response) => {
    setIsLogined(false);
    setAccessToken('');
    setName('');
    setImageUrl('');
  };

  const handleLoginFailure = (response) => {
    console.log('handleLoginFailure', response);
  };

  const handleLogoutFailure = (response) => {
    alert('Failed to log out');
  };

  return (
    <>
      <Header>
        <Title>Advent of Qode</Title>
        {name && <span>Welcome {name}</span>}
        {!name && <span>Login with google to play</span>}
      </Header>
      <Body>
        <Tree userData={userScore} disabled={!isLogined} />

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
      </Body>
    </>
  );
}

export default App;
