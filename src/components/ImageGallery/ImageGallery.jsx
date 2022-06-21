import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import s from './ImageGallery.module.css';

export const ImageGallery = ({ data, onClick }) => {
  return (
      <ul className={s.ImageGallery} >
      {data.map(({ id, largeImageURL, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          image={webformatURL}
          alt={tags}
          largeImageURL={largeImageURL}
          onClick={onClick}
          />
          ))}
      </ul>
  );
};

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired),
  onClick: PropTypes.func,
};