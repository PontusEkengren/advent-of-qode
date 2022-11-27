import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Colours, Button, Group, FlexInputContainer, TimerContainer, ContainerCenterColumn } from './Styled/defaults';
import * as api from './api.js';
import Timer from 'react-compound-timer';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { FlexContainer } from './Styled/defaults';
import { Calculate } from './scoreCalculator';

export default function Question({ modalStatus, day, onCloseModal, onSubmitResult, email }) {
  const [modalIsOpen, setIsOpen] = useState(modalStatus);
  const [input, setInput] = useState('');
  const [questionOfTheDay, setQuestionOfTheDay] = useState('');
  const [options, setOptions] = useState([]);
  const [ready, setReady] = useState('');
  const [incorrectAnswer, SetIncorrectAnswer] = useState('');
  const [correctAnswer, SetCorrectAnswer] = useState(false);
  const initialTime = 15;

  useEffect(() => {
    setIsOpen(modalStatus);
  }, [modalStatus]);

  const handleReady = (start) => {
    api
      .getQuery(day, email)
      .then((response) => {
        setQuestionOfTheDay(response.data.question);
        setOptions(response.data.options);
        setReady(true);
        start();
      })
      .catch((e) => {
        console.log('error', e, day);
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

  const handleSubmit = (stop, getTime, tooSlow) => {
    if ((ready && input) || tooSlow) {
      api
        .submitAnswer(day, tooSlow ? '_AlwaysWrongAnswer_' : input, email)
        .then((response) => {
          if (response.data === 'correct') {
            stop();
            SetCorrectAnswer(true);
            setQuestionOfTheDay('You found the right answer!');
          } else if (response.data === 'slow') {
            SetIncorrectAnswer(true);
            setQuestionOfTheDay(day === 24 ? `To slow` : 'To slow, try again tomorrow');
            stop();
            setTimeout(() => SetIncorrectAnswer(false), 2200);
          } else {
            SetIncorrectAnswer(true);
            setQuestionOfTheDay(day === 24 ? `Wrong answer i'm afraid` : 'Better luck next time');
            stop();
            setTimeout(() => SetIncorrectAnswer(false), 2200);
          }
          setTimeout(() => window.location.reload(false), 2200);
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
      <Modal
        isOpen={modalIsOpen}
        ariaHideApp={false}
        onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseModal}
        style={customStyles}
        contentLabel='Example Modal'
      >
        <Timer
          startImmediately={false}
          direction='backward'
          initialTime={15 * 1000}
          timeToUpdate={25}
          formatValue={(value, e) => {
            return `${value < 10 ? `0${value}` : value}s `;
          }}
        >
          {({ start, stop, getTime }) => (
            <ContainerCenterColumn>
              <FlexContainer>
                <TimerContainer>
                  <div
                    style={{
                      background: Colours.background,
                      color: Colours.lightGrey,
                    }}
                  >
                    <Timer.Seconds />
                    <Timer.Milliseconds
                      formatValue={(value) => {
                        return `${Calculate(getTime(), initialTime)} score `;
                      }}
                    />
                  </div>
                </TimerContainer>
              </FlexContainer>
              {!ready && day === 1 && (
                <h2 style={{ color: getColor(), textAlign: 'center' }}>
                  You can only guess/submit one time <br /> New rules for this year. No time-limit.
                  <br /> However the faster you answer, the higher you score!
                </h2>
              )}
              {!ready && day !== 1 && (
                <h2 style={{ color: getColor() }}>The faster you answer, the higher you score!</h2>
              )}
              {!ready && <Button onClick={() => handleReady(start)}>Ready</Button>}
              {ready && <h2 style={{ color: getColor() }}>{questionOfTheDay}</h2>}

              {options && (
                <Group>
                  <FormControl component='fieldset'>
                    <RadioGroup
                      aria-label='gender'
                      name='gender1'
                      value={'value'}
                      onChange={(e) => {
                        setInput(e.target.value);
                      }}
                    >
                      {options.map((o, i) => (
                        <FlexInputContainer key={`FlexInputContainer${i}`}>
                          <FormControlLabel
                            key={`FormControlLabel${i}`}
                            value={o}
                            control={<Radio />}
                            label={o}
                            checked={o === input}
                          />
                        </FlexInputContainer>
                      ))}
                    </RadioGroup>
                  </FormControl>
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
              </Group>
            </ContainerCenterColumn>
          )}
        </Timer>
      </Modal>
    </div>
  );
}
