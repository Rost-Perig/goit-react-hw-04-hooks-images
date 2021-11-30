import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import s from './Searchbar.module.css';

const INITIAL_QUERY = 'hdr';

const Searchbar = ({searchQueryToUp}) => {
    const [searchQuery, setSearchQuery] = useState(INITIAL_QUERY);

    const inputRef = useRef();

    useEffect(() => {
        if (searchQuery.trim() === '') {
            return;
        };
        searchQueryToUp(searchQuery);

        inputRef.current.placeholder = searchQuery;
        setSearchQuery('');
    }, []);

    const handleInputChange = e => setSearchQuery(e.currentTarget.value);

    const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
            toast.warn('Введи что-то!', {
                autoClose: 2000,
                theme: "colored",
                icon: false,
                }
            );
            return;
        };
        searchQueryToUp(searchQuery);
        inputRef.current.placeholder = searchQuery;
        setSearchQuery('');
    };
    
    return (
        <div className={s.Searchbar} >
            <form className={s.SearchForm} onSubmit={handleSubmit}>
                <button type="submit" className={s.SearchFormButton}>
                    <ImSearch />
                </button>
                <label >
                    <input
                        className={s.SearchFormInput}
                        type="text"
                        name="searchInput"
                        ref={inputRef}
                        placeholder="search"
                        value={searchQuery}
                        onChange={handleInputChange}
                        pattern="^[0-9a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Поисковое слово может состоять только из букв, апострофа, тире, цифр и пробелов."
                    // required
                    />
                </label>
            </form>
        </div>
    );

};

Searchbar.propTypes = {
    searchQuery: PropTypes.string,
};   

export default Searchbar;