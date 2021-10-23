import React from 'react';
import s from './ButtonMore.module.css';

const ButtonMore = ({clickOn}) => {
    return (
        <button type="button" className={s.loadMoreButton} onClick={() => clickOn(true)}>Load more</button>
    );
};

export default ButtonMore;
