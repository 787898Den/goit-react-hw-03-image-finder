import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export const ImageGalleryItem = ({ image, tags, onClick, largeImageURL }) => {
  return (
    <li className={s.ImageGalleryItem} >
      <img
        className={s.ImageGalleryItemImage}
        src={image}
        alt={tags}
        onClick={() => onClick(largeImageURL)}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    }),
  ),
};