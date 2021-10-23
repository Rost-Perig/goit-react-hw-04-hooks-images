import React from 'react';
import s from './ImageGallery.module.css';

const ImageGallery = ({children}) => {
    return (
        <ul className={s.ImageGallery} >
            {children}
        </ul>
    );
    
};

export default ImageGallery;