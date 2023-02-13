import { React, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as API from '../pictures/api';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';

class App extends Component {
  state = {
    searchImage: '',
    images: [],
    page: 1,
    status: 'idle',
    showModal: false,
    largeImageModal: null,
  };

  async componentDidUpdate(_, prevState) {
    const currentSearch = prevState.searchImage;
    const newSearch = this.state.searchImage;
    const currentPage = prevState.page;
    const nextPage = this.state.page;
    const isUpdate = currentSearch !== newSearch || currentPage !== nextPage;

    if (isUpdate) {
      this.setState({ status: 'pending' });

      try {
        const imageList = await API.getImages(newSearch, nextPage);
        this.setState(prevState => ({
          images: [...prevState.images, ...imageList],
          status: 'resolved',
        }));
        if (imageList.length === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please, try again.'
          );
        }
      } catch (error) {
        toast.error('Something went wrong. Please, reload the page.');
        this.setState({ status: 'rejected' });
      }
    }
  }

  onFormSubmit = searchImage => {
    this.setState({ searchImage, images: [], page: 1 });
  };

  onLoadBtnClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  onToggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageModal: largeImageURL });
  };

  render() {
    const { images, status, showModal, largeImageModal } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onFormSubmit} />
        {images.length > 0 && (
          <ImageGallery items={images} onClick={this.onToggleModal} />
        )}
        {status === 'pending' && <Loader />}
        {images.length >= 12 && <Button onClick={this.onLoadBtnClick} />}
        {showModal && (
          <Modal onClose={this.onToggleModal}>
            <img src={largeImageModal} alt="" />
          </Modal>
        )}
        <ToastContainer autoClose={3000} position="top-right" />
      </>
    );
  }
}
export default App;
