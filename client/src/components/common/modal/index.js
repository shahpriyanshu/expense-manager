import React, {useEffect, useState} from 'react';
import {ModalContainer, CloseIcon, ModalContent} from './modal.styles';

const Modal = ({header, isModalOpen, setModalState, children}) => {
    const [isOpen, toggleModal] = useState(isModalOpen);

    useEffect(() => {
        toggleModal(isModalOpen);
    }, [isModalOpen]);

    const closeModal = () => {
        toggleModal(false);
        setModalState(false);
    }

    return (
        isOpen ? <ModalContainer>
            <CloseIcon size={20} onClick={closeModal}/>
            <div>
                {children}
            </div>
        </ModalContainer> : null   
    )
}

export default Modal;