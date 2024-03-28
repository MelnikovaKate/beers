import React, { FC, useState, PropsWithChildren } from 'react';
import styles from './PopupWindow.module.less';
import { Button, Modal } from 'antd';
import { PopupWindowText } from 'enums/PopupWindowText';

interface IPopupWindowProps extends PropsWithChildren {
    buttonText?: string;
    title?: string;
    buttonSubmitText?: string;
    viewButtons?: boolean;
    isOpen?: boolean;
    isMainButton?: boolean;
    onClose?: () => void;
}

export const PopupWindow: FC<IPopupWindowProps> = ({
    buttonText = '',
    title = '',
    buttonSubmitText = PopupWindowText.Submit,
    viewButtons = true,
    isOpen = false,
    isMainButton = true,
    children,
    onClose = () => {}
}) => {
    const [isModalOpen, setIsModalOpen] = useState(isOpen);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        setIsModalOpen(false);
      };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        onClose();
    };

    return (
        <div>
            {isMainButton && (
                <Button className={styles.button} onClick={showModal}>
                    {buttonText}
                </Button>
            )}
            <Modal
                title={title}
                open={isModalOpen}
                width={1000}
                onOk={handleSubmit}
                onCancel={handleCancel}
                afterClose={handleClose}
                footer={viewButtons ? [
                    <Button key="cancel" className={styles.buttonCancel} onClick={handleCancel}>
                        {PopupWindowText.Cancel}
                    </Button>,
                    <Button key="submit" className={styles.buttonSubmit} onClick={handleSubmit}>
                        {buttonSubmitText}
                    </Button>,
                    ] : []
                }
            >
                {children}
            </Modal>
        </div>
    );
};