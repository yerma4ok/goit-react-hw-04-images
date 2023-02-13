import React from 'react';
import { Circles } from 'react-loader-spinner';

import { LoaderWrapper } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderWrapper>
      <Circles
        height="80"
        width="80"
        color="gray"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderWrapper>
  );
};

export default Loader;
