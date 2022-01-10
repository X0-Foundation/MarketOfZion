import React , {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import axios from 'axios'

import {SortingCard} from '../../utils'

import CollectionInfo from "../../components/CollectionInfo"
import NFTItem from '../../components/NFTItem'

import '../../assets/css/profile.css'

const qs = require('query-string');

const CollectionContainer = (props) => {
	let { address } = useParams();
	const parsed = qs.parse(props.location.search); // parsed.search
	const [collectionInfo, setCollectionInfo] = useState(undefined)
	
	const [curTab, setCurTab] = useState('all')
	const [items, setItems] = useState([]) 
	const [page, setPage] = useState(1)
    const [noItems, setNoItems] = useState(false)
    const [initialItemsLoaded, setInitialItemsLoaded] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      SortingCard()
    },[])

	useEffect(() => {        
		getCollectionInfo()       
	}, [address])	
	
	function getCollectionInfo(){
		if (address){
			axios.get(`/api/collection_info/${address}`)
			.then(res => {
				setCollectionInfo(res.data.collection)                
			})
		}		
	}

	useEffect(() => {    
        setItems([])
        setNoItems(false)
        setInitialItemsLoaded(false)
        setLoading(true)   
        setPage(1)    		
        fetchItems(true)    
    }, [curTab,address,parsed.search])
    
    useEffect(() => {
        setLoading(true)    
        if (initialItemsLoaded){			
            fetchItems(false);
        }
    }, [page])
    
    function fetchItems(reset){ 
		if (address) {
			let query = `/api/item/?itemCollection=${address}`;           
            switch (curTab) {
                case 'all':
                    // get all 
                    query = `/api/item/?itemCollection=${address}`; 
                    break;
				case 'sale':
					// On Sale
					query = `/api/item/?itemCollection=${address}&saleType=all`; 
					break;
				default:
                    break;
            }
			if (parsed.search){
				query = `${query}&searchTxt=${parsed.search}`
			}       
			let queryUrl = `${query}&page=${reset ? 1 : page}`				
			axios.get(queryUrl)
			.then(res => {
				setLoading(false)   
				if (res.data.items.length === 0) setNoItems(true)      
				if (reset){        
					setItems(res.data.items)
					setInitialItemsLoaded(true)
				}else{
					let prevArray = JSON.parse(JSON.stringify(items))
					prevArray.push(...res.data.items)
					setItems(prevArray)        
				}            
			})
			.catch(err => {            
				setLoading(false)  
				if (err.response.data.message === 'No Items found') {
					setNoItems(true)    
				}      
			})
		}
    }
    
    function loadMore() {
        if (!loading) {
            setPage(page => {return (page + 1)}) 
        }      
    }

  return (
	<section className="blog-area section-padding-100 profile-container">
		<div className="container">
			<div className="row">
				<div className="col-12 col-lg-3 mt-100 mb-30">
					<CollectionInfo
						name={collectionInfo?.name}
						uri={collectionInfo?.uri}									      
					/>										
				</div>	
						
				
				<div className="col-12 col-md-9">	
					<div className="dream-projects-menu mb-15">
						<div className="text-center portfolio-menu">
							<button className={`btn ${curTab==='all' ? 'active' : ''}`}
								onClick={() => setCurTab('all')}>
									All								
							</button>
							<button className={`btn ${curTab==='sale' ? 'active' : ''}`}
								onClick={() => setCurTab('sale')}>
									On Sale
							</button>
						</div>
					</div>
					<div className="search-widget-area mb-50">
						<form>
							<input type="search" name="search" id="search" defaultValue={parsed.search} placeholder="Search Items..." />
							<button type="submit" className="btn"><i className="fa fa-search"></i></button>
						</form>
					</div>				
					<div className="row align-items-center">					
						{items.map((item , index) => (
							<div className="col-12 col-md-6 col-lg-4">
								<NFTItem key={index} {...props} item={item} />                  
							</div>									
						))}
						<div className="col-12 col-lg-12 text-center" style={{display: noItems ? "none" : ""}}>
							<div className="btn more-btn" onClick={() => loadMore()}>
								{loading ? "Loading..." : "Load more"}
							</div>
						</div>					
						
					</div>
				</div>
			</div>
		</div>
	</section>

  );
}

export default CollectionContainer;