import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Colours, Button, Group, Input, ContainerCenterColumn, FlexContainer } from './Styled/defaults';
import * as api from './api.js';

export default function Question({ modalStatus, day, onCloseModal }) {
  const [modalIsOpen, setIsOpen] = useState(modalStatus);
  const [input, setInput] = useState('');
  const [questionOfTheDay, setQuestionOfTheDay] = useState('');
  const [ready, setReady] = useState('');

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

  const handleReady = () => {
    api
      .getQuery(day)
      .then((response) => {
        setQuestionOfTheDay(response.data.question);
        setReady(true);
      })
      .catch(() => {
        setQuestionOfTheDay('Unable to fetch data from database');
      });
  };

  const customStyles = {
    content: {
      background: Colours.background,
      color: Colours.green,
    },
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    //Sumbit answer
    console.log('Sumbit!', input);
  };

  const handleCloseModal = () => {
    setInput('');
    setReady(false);
    onCloseModal();
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} ariaHideApp={false} onAfterOpen={afterOpenModal} onRequestClose={handleCloseModal} style={customStyles} contentLabel='Example Modal'>
        <ContainerCenterColumn>
          <h2>Timer goes here</h2>
          {ready && <h2>{questionOfTheDay}</h2>}
          {!ready && <Button onClick={handleReady}>Ready</Button>}
          <FlexContainer>
            <div style={{ margin: '15px 10px 0 0' }}>Answer: </div>
            <div>
              <Input onKeyDown={handleKeyDown} onChange={(e) => setInput(e.target.value)} value={input} />
            </div>
          </FlexContainer>

          <Group>
            <Button onClick={handleSubmit}>[Submit]</Button>
            <Button onClick={handleCloseModal}>[Go back]</Button>
          </Group>
        </ContainerCenterColumn>
      </Modal>
    </div>
  );
}
