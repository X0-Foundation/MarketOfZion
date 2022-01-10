import * as React from 'react';

function CollectionInfo({name, uri}){
	return(
    <div>
        <div className="service_single_content collection-item">            
          <div className="collection_icon">
            <div className="cover-container">
                <img src={uri} alt="" />
            </div> 
          </div>
          <div className="account_info text-center">
            <h6>{name}</h6>                             
          </div>              
        </div>
    </div>
	)
}

export default CollectionInfo