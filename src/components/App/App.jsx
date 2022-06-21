import { Component } from 'react';
import { Watch } from 'react-loader-spinner';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { ServiceAPI } from '../../service/API';
import { ImageGallery } from '../ImageGallery';
import s from '../ImageGallery/ImageGallery.module.css';
import { Searchbar } from '../Searchbar';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class App extends Component {
  state = {
    query: '',
    data: [],
    page: 1,
    error: null,
    status: '',
    showModal: false,
    imgId: null,
    total: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      this.setState({ status: 'pending', data: [], page: 1 }, this.getPicture);
    }
    if (this.state.page !== prevState.page && this.state.page !== 1) {
      this.setState({ status: 'pending' }, this.getPicture);
    }
  }

  getPicture = () => {
    const { query } = this.state;
    const { page } = this.state;
    ServiceAPI(query, page)
      .then(this.dataProcessing)
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  dataProcessing = response => {
    const { hits: dataArray, totalHits } = response.data;

    if (!dataArray.length) {
      this.setState({
        status: 'rejected',
        error: new Error('Try to change the request'),
      });
      return;
    }
    window.scrollBy({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });

    return this.setState(({ data }) => {
      return {
        data: [...data, ...dataArray],
        total: totalHits,
        status: 'resolved',
      };
    });
  };

  handleSubmit = searchQuery => {
    if (this.state.query !== searchQuery) {
      this.setState({ query: searchQuery });
    }
    return;
  };

  handleLoadMore = () => {
    this.setState(({ page }) => {
      return { page: page + 1 };
    });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => {
      return {
        showModal: false,
        imgId: '',
      };
    });
  };

  clickOnImage = largeImageURL => {
    this.setState({ imgId:largeImageURL, showModal: true, });
    console.log('clickOnImage', largeImageURL);
  };

  handleData = () => {
    return this.state.data.find(img => img.id === this.state.imgId);
  };

  render() {
    const { status, error, data, showModal, total } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} /> 
        {data.length > 0 && (
          <ImageGallery data={data} onClick={this.clickOnImage} />
        )}
        {status === 'resolved' && data.length > 0 && data.length < total && (
          <>
            <Button onClick={this.handleLoadMore} />
          </>
        )}

        {status === 'pending' && (
          <div className={s.Watch}>
            <Watch
              color="blue"
              height={300}
              width={300}
              ariaLabel="loading"
            />
          </div>
        )}

        {status === 'rejected' && (
          <div className={s.ImageGallery}>
            <p>{`Something went wrong! ${error}`}</p>
          </div>
        )}

        {showModal && createPortal (
          <Modal onClose={this.toggleModal}>
            <img src={this.state.imgId} alt="" />
          </Modal>,
          modalRoot
        )}
      </div>
    );
  }
}