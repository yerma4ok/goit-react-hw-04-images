import React from 'react';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClickImage }) => {
  return (
    <li className="gallery-item" onClick={() => onClickImage(largeImageURL)}>
      <img src={webformatURL} alt="Gallery Item" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClickImage: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
