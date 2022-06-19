import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';

export const ImageGalleryItem = ({ images }) => {
        return images.map(({ id, src, alt,imageURL,onClick}) => {
    return (
      <li className={s.ImageGalleryItem} key={id}  >
        <img
          className={s.ImageGalleryItemImage}
          src={src}
          alt={alt}
          data-id={id}
          imageURL={imageURL}
          onClick={onClick}
        />
      </li>
    );
  });
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      onClick: PropTypes.func,
    }),
  ),
};