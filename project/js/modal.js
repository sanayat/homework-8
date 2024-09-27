//MODAL

const modal = document.querySelector('.modal');
const modalTrigger = document.querySelector('#btn-get');
const modalCloseButton = document.querySelector('.modal_close');

let hasScrolledToBottom = false;
const openModal = () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}
const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
};
modalTrigger.onclick = () => openModal();

modalCloseButton.onclick = () => closeModal();
modal.onclick = (event) => {
    if (event.target === modal) {
        closeModal();
    }
};
const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (!hasScrolledToBottom) {
            hasScrolledToBottom = true;
            openModal();
            window.removeEventListener('scroll', handleScroll);
        }
    }
};

window.addEventListener('scroll', handleScroll);


window.onload = () => {
    setTimeout(() => {
        if (!hasScrolledToBottom) {
            openModal();
        }
    }, 10000);
};
