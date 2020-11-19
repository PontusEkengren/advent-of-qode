import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Colours, Button, Input, ContainerCenterColumn } from './Styled/defaults';

export default function Question({ modalStatus, day, handleCloseModal }) {
  const [modalIsOpen, setIsOpen] = useState(modalStatus);

  useEffect(() => {
    setIsOpen(modalStatus);
  }, [modalStatus]);

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  };

  const customStyles = {
    content: {
      background: Colours.background,
      color: Colours.green,
      // left: '50%',
      // right: 'auto',
      // bottom: 'auto',
      // marginLeft: '-50%',
      // transform: 'translate(-50%, -50%)',
    },
  };

  // export const ModalContainer = styled(Modal)`
  //   background: #0f0f23;
  //   display: flex;
  //   flex-direction: column;
  //   font-size: calc(10px + 1.5vmin);
  //   color: #009900;
  //   margin-left: 20px;
  // `;

  const handleKeyDown = () => {};

  return (
    <div>
      <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={handleCloseModal} style={customStyles} contentLabel='Example Modal'>
        <ContainerCenterColumn>
          <h2>Question goes here based on day clicked: {day && day}</h2>
          Answer:
          <Input onKeyDown={handleKeyDown} />
          <Button>[Submit]</Button>
        </ContainerCenterColumn>
      </Modal>
    </div>
  );
}
