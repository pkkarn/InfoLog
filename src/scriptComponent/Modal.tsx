import React from 'react';
import { Modal } from 'antd';
import './modal.scss'

type ModalProps = {
    isModalOpen: boolean,
    setIsModalOpen: (value: boolean) => void;
    children: React.ReactNode
}


export const ModalComponet: React.FC<ModalProps> = ({ isModalOpen, setIsModalOpen, children }) => {
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Modal
                zIndex={1000000}
                centered={true}
                width={600}
                open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                {children}
            </Modal>
        </>
    );
};