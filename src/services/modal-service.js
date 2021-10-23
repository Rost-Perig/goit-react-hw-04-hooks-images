/* ===== опредилени данных предстоящей картинки ===== */

export function imgOpen(id, arr) {
    const soughtIndex = arr.findIndex(item => item.id === Number.parseInt(id) );
    const lrgImgURL = arr[soughtIndex].largeImageURL;
    const imgTags = arr[soughtIndex].tags;
    const imgNo = arr[soughtIndex].id;
    return {lrgImgURL, imgTags, imgNo}
};

/* ===== изменение данных картинки ===== */
 
export function modalImageRun(direction, id, arr) {

    const curImgIndex = arr.findIndex(item => item.id === id);

    let nextImgIndex = 0;

    if (direction === 'right') {
        curImgIndex === arr.length - 1 ?
        nextImgIndex = 0 :
        nextImgIndex = curImgIndex + 1; 
    } else {
        curImgIndex === 0 ?
        nextImgIndex = arr.length - 1 :
        nextImgIndex = curImgIndex - 1;
    };

    let lrgImgURL = arr[nextImgIndex].largeImageURL;
    let imgTags = arr[nextImgIndex].tags;
    let imgNo = arr[nextImgIndex].id;
    
    return { lrgImgURL, imgTags, imgNo };
};

/* ===== перелистывание картинок в модальном окне клиом мыши===== */

export function changeModalImg(value, id, arr) {
    
    let direction = '';

    // if (value === "ArrowRight" || value >= (window.innerWidth / 2)) {
    //     direction = 'right';
    //     return modalImageRun(direction, id, arr);
    // };

    // if (value === "ArrowLeft" || value < (window.innerWidth / 2)) {
    //     direction = 'left';
    //     return modalImageRun(direction, id, arr);
    // };
    (value >= (window.innerWidth / 2)) && (direction = 'right');
    (value < (window.innerWidth / 2)) && (direction = 'left');

    return modalImageRun(direction, id, arr);
};