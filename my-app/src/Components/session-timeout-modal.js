import React, { useState } from 'react';
import { Modal } from 'antd';
import axios from 'axios'

const SessionModal = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    delete axios.defaults.headers.common['Authorization'];
    props.setUser({ auth:false, name:'' });
    props.history.push('/');
  };

  return (
    <>
      <Modal    
        title="Session Expired!"
        onOk={handleOk}
        confirmLoading={confirmLoading}
        visible={props.visiblity}
        closable={false}
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <p>Please login again.</p>
      </Modal>
    </>
  );
};
export default SessionModal;