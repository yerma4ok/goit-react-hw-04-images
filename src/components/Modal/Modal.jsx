import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  onBackdropClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className="overlay" onClick={this.onBackdropClick}>
        <div className="modal">{this.props.children}</div>
      </div>,
      document.querySelector('#root')
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Modal;