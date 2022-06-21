import axios from 'axios';

const ServiceAPI = (q, page) => {
  const options = {
    params: {
      key: '26864828-e18992272edb9570246020d60',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      q,
      page,
    },
  };

  return axios.get('https://pixabay.com/api/', options);
};

export { ServiceAPI };

