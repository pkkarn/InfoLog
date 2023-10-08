import { CaretUpOutlined, CopyOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useState } from 'react'
import { FloatButton } from 'antd'
import { ModalComponet } from './Modal';
import { NoteForm } from './NoteForm';

export const MenuComponent: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)


  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState) // this because using isModalOpen directly, and using it inside useEffect basically 
    //set this value inside clousure and every single time you would get same value once its been used
    // Use it when things are dependent on oldState or else you can use your normal approach
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.code === 'KeyK') {
        event.preventDefault();
        toggleModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup: remove the event listener when the component is unmounted.
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

  return (
    <>
      <ModalComponet isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <NoteForm setIsModalOpen={setIsModalOpen} />
      </ModalComponet>
      <FloatButton
        onClick={() => { toggleModal() }}
        type="primary"
        style={{ right: 24 }}
        icon={<CaretUpOutlined />}
      />
    </>
  )
}