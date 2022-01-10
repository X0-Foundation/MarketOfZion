import * as React from 'react';
import '../../assets/css/home.css'
import Head from '../../layouts/Head';
import HomeContainer from '../../containers/Home';
import Footer from '../../layouts/Footer';

const Home = (props) => {

  return (
  	<>
  		<Head {...props} Title='TheXdao' />
	    <HomeContainer {...props}/>
		<Footer/>
    </>
  );
}

export default Home;

