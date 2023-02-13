import axios from 'axios';

const API_KEY = '29782794-b9eda9bd41e3d760704492fd6';
const PER_PAGE = '12';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (search, page) => {
  const response = await axios.get(
    `/?key=${API_KEY}&q=${search}&page=${page}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal`
  );
  return response.data.hits.map(({ id, webformatURL, largeImageURL }) => {
    return { id, webformatURL, largeImageURL };
  });
};
