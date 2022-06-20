// import axios from 'axios';
//   const baseURL = "https://pixabay.com/api/";
//   const params ={
//       key: '26864828-e18992272edb9570246020d60',
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: 12,
//     };

//   const  ServiceAPI = async ( q="", page = 1) =>{
//     try{
//       const {data} = await axios.get(baseURL , {
//         params :{...params, q,page},
//       });

//       return data;
//     } catch (error) {
//       console.error(error.message);
//     }
//   }

// export { ServiceAPI };

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

