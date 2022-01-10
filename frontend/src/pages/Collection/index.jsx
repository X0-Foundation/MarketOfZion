import * as React from 'react';
import Head from '../../layouts/Head';
import CollectionContainer from '../../containers/Collection';
import Footer from '../../layouts/Footer';

const Collection = (props) => {

  return (
    <>
      <Head {...props} Title='Collection Information' />
      <CollectionContainer {...props}/>
      <Footer />
    </>
  );
}

export default Collection;