import * as React from 'react';
import '../../assets/css/home.css'
import Head from '../../layouts/Head';
import HowItWorkContainer from '../../containers/HowItWork/HowItWork';
import Footer from '../../layouts/Footer';

const HowItWork = (props) => {

  return (
  	<>
  		<Head {...props} Title='TheXdao' />
	    <HowItWorkContainer {...props}/>
		<Footer/>
    </>
  );
}

export default HowItWork;

