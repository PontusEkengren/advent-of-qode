import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Colours, Button, Group, Input, TimerContainer, ContainerCenterColumn, FlexContainer } from './Styled/defaults';
import * as api from './api.js';
import Timer from 'react-compound-timer';

export default function Question({ modalStatus, day, onCloseModal }) {
  const [modalIsOpen, setIsOpen] = useState(modalStatus);
  const [input, setInput] = useState('');
  const [questionOfTheDay, setQuestionOfTheDay] = useState('');
  const [ready, setReady] = useState('');
  const [timer, setTimer] = useState('');

  useEffect(() => {
    setIsOpen(modalStatus);
  }, [modalStatus]);

  const afterOpenModal = () => {
    // if (day) {
    //   api.getQuery(day).then((response) => {
    //     setQuestionOfTheDay(response.data);
    //   });
    // }
  };

  const handleReady = (start) => {
    api
      .getQuery(day)
      .then((response) => {
        setQuestionOfTheDay(response.data.question);
        setReady(true);
        start();
      })
      .catch(() => {
        setQuestionOfTheDay('Unable to fetch data from database');
      });
  };

  const customStyles = {
    content: {
      background: Colours.background,
      color: Colours.lightGrey,
    },
  };

  const handleKeyDown = (e, stop) => {
    if (e.keyCode === 13) {
      handleSubmit(stop);
    }
  };

  const handleSubmit = (stop) => {
    //Sumbit answer
    console.log('Sumbit!', input);

    //if correct
    // stop();
  };

  const handleCloseModal = () => {
    setInput('');
    setReady(false);
    onCloseModal();
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} ariaHideApp={false} onAfterOpen={afterOpenModal} onRequestClose={handleCloseModal} style={customStyles} contentLabel='Example Modal'>
        <Timer startImmediately={false} onStop={() => console.log('onStop hook')}>
          {({ start, resume, pause, stop, reset, timerState }) => (
            <ContainerCenterColumn>
              <div>
                <TimerContainer>
                  <Timer.Minutes />:
                  <Timer.Seconds />
                </TimerContainer>
              </div>
              {!ready && <Button onClick={() => handleReady(start)}>Ready</Button>}

              {ready && <h2>{questionOfTheDay}</h2>}
              <FlexContainer>
                <div style={{ margin: '15px 10px 0 0' }}>Answer: </div>
                <div>
                  <Input
                    onKeyDown={(e) => {
                      handleKeyDown(e, stop);
                    }}
                    onChange={(e) => setInput(e.target.value)}
                    value={input}
                  />
                </div>
              </FlexContainer>
              <Group>
                <Button
                  onClick={() => {
                    handleSubmit(stop);
                  }}
                >
                  [Submit]
                </Button>
                <Button onClick={handleCloseModal}>[Go back]</Button>
              </Group>
            </ContainerCenterColumn>
          )}
        </Timer>
      </Modal>
    </div>
  );
}
