import React, { useRef } from 'react';
import { Backdrop, Box, Modal } from '@material-ui/core';

interface Props {
  open: boolean;
  handleClose: () => void;
  children: JSX.Element;
}

export const ModalComponent: React.FC<Props> = ({ open, handleClose, children }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  return (
    <Modal
      style={{
        display: 'grid',
        placeItems: 'center',
        width: '100vw',
        height: '100vh',
        overflowY: 'scroll'
      }}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
      container={() => rootRef.current}
    >
      <Box display="flex" justifyContent="center">
        {children}
      </Box>
    </Modal>
  );
};
