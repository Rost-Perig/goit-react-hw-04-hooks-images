import React, {useEffect} from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ closeModalClick, changeImg, closeModalEsc, modalOn, changeImgKey, children }) => {

    useEffect(() => {
        window.addEventListener('keydown', e => handleKeyDown(e))
    });

    // window.removeEventListener('keydown', handleKeyDown);
    
    const closeModal = e => {
        e.target === e.currentTarget && closeModalClick(true)
    };

    const handleKeyDown = e => {
        (e.code === 'Escape') && closeModalEsc();
        // (e.code === "ArrowRight" || e.code === "ArrowLeft") && changeImg(e.code);
    };


    return createPortal(

        <div className={s.Overlay} onClick={closeModal} >
            <div className={s.Modal}>
                {children}
            </div>
        </div>,

        modalRoot,
    );
};

export default Modal;

