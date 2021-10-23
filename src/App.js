import { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './componets/Searchbar';
import Spinner from './componets/Spinner';
import ImageGallery from './componets/ImageGallery';
import ImageGalleryItem from './componets/ImageGallery/ImageGalleryItem';
import imgApiService from './services/api-img-service';
import ButtonMore from './componets/ButtonMore';
import Modal from './componets/Modal';
import BtnToTop from './componets/BtnToTop'
import { imgOpen, changeModalImg  } from './services/modal-service';

function App() {
    
    const [searchQuery, setSearchQuery] = useState('');
    const [status, setStatus] = useState('idle');
    const [totalImg, setTotalImg] = useState(0);
    let [page, setPage] = useState(1);
    const [imgObjArr, setImgObjArr] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState('');
    const [tags, setTags] = useState('');
    const [imgId, setImgId] = useState(0);

    useEffect(() => {
        async function fetchData() {
            if (!searchQuery) {
                return setStatus('idle');
            };
            setStatus('pending');
            let newRequest;
            try {
                newRequest = await imgApiService.fetchImages(searchQuery, 1);
            }
            catch (error) {
                console.log('Error: request failed');
                return setStatus('failed')
            };

            if (newRequest.data.totalHits === 0) {
                return setStatus('rejected')
            };

            setImgObjArr([...newRequest.data.hits]);
            setTotalImg(newRequest.data.totalHits);
            setStatus('resolved');
        };

        fetchData();
    }, [searchQuery]);

    const searchQuerySubmit = query => {
        setSearchQuery(query);
        setPage(1);
    };

    const loadMore = async () => {
        let newRequest;
        let newPage = page + 1;
        try {
            newRequest = await imgApiService.fetchImages(searchQuery, newPage);
        }
        catch (error) {
            console.log('Error: request failed');
            return this.setState({status: 'failed'})
        };

        let scrollPoint = 0;
            
        setImgObjArr((prevState) => {
            let scrollToElId = prevState[prevState.length - 1].id;
            scrollPoint = window.scrollY + Math.floor(document.querySelector(`[id="${scrollToElId}"]`).getBoundingClientRect().bottom) - 32;
            return [...prevState, ...newRequest.data.hits]
        });
        setPage(newPage);
        setTotalImg(newRequest.data.totalHits);

        setTimeout(() => {
            window.scrollTo({
                top: scrollPoint,
                behavior: 'smooth',
            }); 
        }, 500);
    };

    // let scrollPoint = 0;

    // const scrollFoo = () => {
    //     window.scrollTo({
    //             top: scrollPoint,
    //             behavior: 'smooth',
    //         }); 
    // };

    const closeModalClick = (data) => {
       data && toggleModal()
    };

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const openModal = (imageId) => {
        const { lrgImgURL, imgTags, imgNo } = imgOpen(imageId, imgObjArr);
        setShowModal(!showModal);
        setImgId(imgNo);
        setLargeImageURL(lrgImgURL);
        setTags(imgTags);
    };

    const moveImg = value => {
        const { lrgImgURL, imgTags, imgNo } = changeModalImg(value, imgId, imgObjArr);
        setImgId(imgNo);
        setLargeImageURL(lrgImgURL);
        setTags(imgTags);
    };


    return (

        <div className="App">

            <Searchbar searchQueryToUp={searchQuerySubmit} />

            {(status === 'idle') && <h2 className="galleryTitle">Введите запрос</h2>}

            {(status === 'pending') && <Spinner/>}

            {(status === 'rejected') && <h2 className="galleryTitle">По запросу "{searchQuery.toUpperCase()}" ничего не найдено</h2>}

            {(status === 'failed') && <h2 className="galleryTitle">Error: request failed. Нет соединения с интернетом или сервером</h2>}

            {(status === 'resolved') && (
                <>
                    <h2 className="galleryTitle">Найдено {totalImg} изображений по запросу "{searchQuery.toUpperCase()}":</h2>

                    <ImageGallery>
                        {imgObjArr.map(item => {
                            const { id } = item;
                            return (
                                <ImageGalleryItem key={id} contactObj={item} imgIdToUp={openModal }/>
                            );
                        })}
                    </ImageGallery>
                </>   
            )}

            {(page * 12 < totalImg) && <ButtonMore clickOn={loadMore}/>}
            {((page * 12 >= totalImg) && (status === 'resolved')) && <h2 className="galleryTitle">Запрос "{searchQuery.toUpperCase()}" успешно выполнен</h2>}
        
            <ToastContainer />

            <BtnToTop/>
            
            {showModal &&
                <Modal closeModalClick={closeModalClick} closeModalEsc={toggleModal} changeImg={moveImg} modalOn={showModal}>
                    <img src={largeImageURL} alt={tags} className="modalImg" onClick={e => moveImg(e.clientX)}/>
                </Modal>}

        </div>
    );
};


export default App;