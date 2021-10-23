import React from 'react';import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';
import { ImHome } from 'react-icons/im';


const ImageGalleryItem = ({ contactObj, imgIdToUp }) => {
    const { webformatURL, tags, largeImageURL, id, pageURL } = contactObj;
    return (
        <li className={s.ImageGalleryItem}>
            <a
                href={largeImageURL}
                id={id}
                className={s.ImageGalleryItemLink}
                onClick={e => {
                    e.preventDefault();
                    return imgIdToUp(e.currentTarget.id);
                }}
            >
                <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
            </a>
            <a
                href={pageURL} className={s.homePageUrl} target="_blank" rel="noreferrer"
            >
                <ImHome className={s.homeIcon}/>
            </a>
        </li>
        
    );
};

ImageGalleryItem.propTypes = {
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
    id: PropTypes.number,
    pageURL: PropTypes.string
};

export default ImageGalleryItem;