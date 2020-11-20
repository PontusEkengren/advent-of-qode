import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Colours, Button, Group, FlexInputContainer, TimerContainer, ContainerCenterColumn, FlexContainer } from './Styled/defaults';
import * as api from './api.js';
import Timer from 'react-compound-timer';

export default function Question({ modalStatus, day, onCloseModal, onSubmitResult }) {
  const [modalIsOpen, setIsOpen] = useState(modalStatus);
  const [input, setInput] = useState('');
  const [questionOfTheDay, setQuestionOfTheDay] = useState('');
  const [options, setOptions] = useState([]);
  const [ready, setReady] = useState('');
  const [incorrectAnswer, SetIncorrectAnswer] = useState('');
  const [hint, setHint] = useState(null);
  const [correctAnswer, SetCorrectAnswer] = useState(false);

  useEffect(() => {
    setIsOpen(modalStatus);
  }, [modalStatus]);

  const handleReady = (start) => {
    api
      .getQuery(day)
      .then((response) => {
        setQuestionOfTheDay(response.data.question);
        setOptions(response.data.options);
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
  const afterOpenModal = () => {};

  const getColor = () => {
    if (correctAnswer) return Colours.green;
    return incorrectAnswer ? Colours.red : Colours.lightGrey;
  };

  const handleSubmit = (stop, getTime) => {
    const roundedTime = Math.round(Math.floor(getTime()) / 1000);
    if (ready && input) {
      //Sumbit answer
      api
        .submitAnswer(day, input)
        .then((response) => {
          if (response.data === 'correct') {
            stop();
            SetCorrectAnswer(true);
            setQuestionOfTheDay('You found the right answer!');
            //Submit result
            onSubmitResult(roundedTime);
          } else {
            SetIncorrectAnswer(true);
            setQuestionOfTheDay('Try again tomorrow');
            stop();
            onSubmitResult(-1);
            setTimeout(() => SetIncorrectAnswer(false), 750);
          }
        })
        .catch((e) => {
          console.log('Error', e);
          setQuestionOfTheDay('Unable to fetch data from database');
        });
    }
  };

  const handleCloseModal = () => {
    setInput('');
    setReady(false);
    setOptions([]);
    onCloseModal();
    SetCorrectAnswer(false);
    SetIncorrectAnswer('');
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} ariaHideApp={false} onAfterOpen={afterOpenModal} onRequestClose={handleCloseModal} style={customStyles} contentLabel='Example Modal'>
        <Timer
          startImmediately={false}
          timeToUpdate={15}
          checkpoints={[
            {
              time: 60000,
              callback: () => {
                // setHint('Guessing is free!');
                setTimeout(() => setHint(null), 20000);
              },
            },
          ]}
        >
          {({ start, stop, getTime }) => (
            <ContainerCenterColumn>
              <div>
                <TimerContainer>
                  <Timer.Minutes />:
                  <Timer.Seconds />
                </TimerContainer>
              </div>
              {!ready && day === 1 && <h2 style={{ color: getColor() }}>You can only guess/submit one time</h2>}
              {!ready && day !== 1 && <h2 style={{ color: getColor() }}>Remeber, you can only guess once</h2>}
              {!ready && <Button onClick={() => handleReady(start)}>Ready</Button>}
              {ready && <h2 style={{ color: getColor() }}>{questionOfTheDay}</h2>}
              {options && (
                <Group onChange={(e) => setInput(e.target.value)}>
                  {options.map((o, i) => (
                    <FlexInputContainer key={`FlexInputContainer${i}`}>
                      <input type='radio' value={o} name='options' key={`input${i}`} />
                      <span key={`span${i}`}>{o}</span>
                    </FlexInputContainer>
                  ))}
                </Group>
              )}
              {/* <div>
                  <Input color={getColor()} onChange={(e) => setInput(e.target.value)} value={input} />
                </div> */}
              <Group>
                <Button
                  disabled={!ready}
                  onClick={() => {
                    handleSubmit(stop, getTime);
                  }}
                >
                  [Submit]
                </Button>
                <Button onClick={handleCloseModal}>[Go back]</Button>

                {hint && <div>{hint}</div>}
              </Group>
            </ContainerCenterColumn>
          )}
        </Timer>
      </Modal>
    </div>
  );
}
