import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Colours, Button, Group, Input, ContainerCenterColumn } from './Styled/defaults';

export default function Question({ modalStatus, day, onCloseModal }) {
  const [modalIsOpen, setIsOpen] = useState(modalStatus);
  const [input, setInput] = useState('');

  useEffect(() => {
    setIsOpen(modalStatus);
  }, [modalStatus]);

  const afterOpenModal = () => {
    //Get the data
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
    onCloseModal();
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} ariaHideApp={false} onAfterOpen={afterOpenModal} onRequestClose={handleCloseModal} style={customStyles} contentLabel='Example Modal'>
        <ContainerCenterColumn>
          <h2>Timer and "Ready button" here</h2>
          <h2>Question goes here based on day clicked: {day && day}</h2>
          Answer:
          <Input onKeyDown={handleKeyDown} onChange={(e) => setInput(e.target.value)} value={input} />
          <Group>
            <Button onClick={handleSubmit}>[Submit]</Button>
            <Button onClick={handleCloseModal}>[Go back]</Button>
          </Group>
        </ContainerCenterColumn>
      </Modal>
    </div>
  );
}
