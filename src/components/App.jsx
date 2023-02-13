import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../pictures/api';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

export default function App() {
  const [searchImage, setSearchImage] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageModal, setLargeImageModal] = useState(null);
  // state = {
  //   searchImage: '',
  //   images: [],
  //   page: 1,
  //   status: 'idle',
  //   showModal: false,
  //   largeImageModal: null,
  // };

  useEffect(() => {
    if (!searchImage) {
      return;
    }

    async function render() {
      setStatus('pending');

      try {
        const imageList = await API.getImages(searchImage, page);
        setImages([...images, ...imageList]);
        setStatus('resolved');

        if (imageList.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please, try again.'
          );
        }
      } catch (error) {
        toast.error('Something went wrong. Please, reload the page.');
        setStatus('rejected');
      }
    }
    render();
  }, [images, page, searchImage]);

  const onFormSubmit = searchImage => {
    setSearchImage(searchImage);
    setImages([]);
    setPage(1);
  };

  const onLoadBtnClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onToggleModal = largeImageURL => {
    setShowModal(!showModal);
    setLargeImageModal(largeImageURL);
  };

  return (
    <>
      <Searchbar onSubmit={onFormSubmit} />
      {images.length > 0 && (
        <ImageGallery items={images} onClick={onToggleModal} />
      )}
      {status === 'pending' && <Loader />}
      {images.length >= 12 && <Button onClick={onLoadBtnClick} />}
      {showModal && (
        <Modal onClose={onToggleModal}>
          <img src={largeImageModal} alt="" />
        </Modal>
      )}
      <ToastContainer autoClose={3000} position="top-right" />
    </>
  );
}
