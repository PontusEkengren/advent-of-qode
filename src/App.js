import './App.css';
import React, { useState, useEffect } from 'react';
import { Header, Body, ContainerCenterColumn, FlexContainer } from './Styled/defaults';
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
  const [accessToken, setAccessToken] = storage.useLocalStorage('googleId', '');
  const [name, setName] = storage.useLocalStorage('name', '');
  const [email, setEmail] = storage.useLocalStorage('email', '');
  const [imageUrl, setImageUrl] = storage.useLocalStorage('imageUrl', undefined);

  useEffect(() => {
    api.getUserScore().then((response) => {
      setUserScore(response.data);
    });
  }, []);

  const login = (response) => {
    if (response.accessToken) {
      console.log('profile', response.profileObj);
      setIsLogined(true);
      setAccessToken(response.profileObj.googleId);
      setName(response.profileObj.name);
      setEmail(response.profileObj.email);
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

  const handleSubmit = (time, day) => {
    console.log('test time: ', time);

    // {
    //   public string UserId { get; set; }
    //   public int Score { get; set; }
    //   public string Email { get; set; }
    //   public int Question { get; set; }

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
        console.log('Submit Success', response);
      })
      .catch((e) => {
        console.log('error', e);
        // setQuestionOfTheDay('Unable to fetch data from database');
      });
  };

  return (
    <>
      <Header>
        <Title>Advent of Qode</Title>
        {name && <span>Welcome {name}</span>}
        {!name && <span>Login with google to play</span>}
      </Header>
      <Body>
        <FlexContainer>
          <Tree userData={userScore} disabled={!isLogined} onSubmit={handleSubmit} />
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
    </>
  );
}

export default App;
