import * as React from 'react';
import InfoComponent from '../../components/InfoComponent'
import ContactForm from './ContactForm'
import '../../assets/css/contact.css'

const ContactContainer = (props) => {

  return (
    
	<section className="section-padding-100 contact_us_area contact-container" id="contact">
		<div className="container">
			<div className="row">
				<div className="col-12">
				<InfoComponent
					titleSm='Get in Touch'
					titleLg='Suggest feature'		              
				/>
				</div>
			</div>

			<ContactForm {...props}/>
		</div>
	</section>
    
  );
}

export default ContactContainer;