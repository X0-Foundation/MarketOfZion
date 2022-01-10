import React , {useState,useEffect} from "react";
import axios from 'axios'
import InfoComponent from '../../components/InfoComponent'
import NFTItem from '../../components/NFTItem'

import '../../components/ListedItems/listedItems.css'

const qs = require('query-string');

const ListedContainer = (props) => {
  const parsed = qs.parse(props.location.search); // parsed.search
  const [items, setItems] = useState([]) 
	const [page, setPage] = useState(1)
  const [noItems, setNoItems] = useState(false)
  const [initialItemsLoaded, setInitialItemsLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (categories.length === 0) fetchCategories();
  }, [categories]);

  function fetchCategories() {        
    axios.get(`/api/categories`)
    .then((res) => {            
        setCategories(res.data.categories);                 
    })
    .catch((err) => {
        console.log("err: ", err.message);
        setCategories([]);
    });
  }

  useEffect(() => {    
    setItems([])
    setNoItems(false)
    setInitialItemsLoaded(false)
    setLoading(true)   
    setPage(1)    		
    fetchItems(true)    
  }, [parsed.search, category])

  useEffect(() => {
    setLoading(true)    
    if (initialItemsLoaded){			
        fetchItems(false);
    }
  }, [page])

  function fetchItems(reset){     
    let query = `/api/item/?saleType=fixed`;          
    if (parsed.search){
      query = `${query}&searchTxt=${parsed.search}`
    }    
    if (category){
      query = `${query}&category=${category}`
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

  function loadMore() {
    if (!loading) {
        setPage(page => {return (page + 1)}) 
    }      
  }

  return(
    <section className="section-padding-100 clearfix explore-container">

        <div className="container">
            <InfoComponent
              titleSm='Marketplace Items'
              titleLg='Listed Items'              
            />
            <div className="search-widget-area mb-30">
              <form>
                <input type="search" name="search" id="search" defaultValue={parsed.search} placeholder="Search Items..." />
                <button type="submit" className="btn"><i className="fa fa-search"></i></button>
              </form>
            </div>
            
            <div className="col-12 col-md-12">
              <div className="mb-15">
                <p className="w-text">Choose Category</p>
                <div className="filers-list ">
                  <div className={`filter-item mr-15 ${category === "" ? 'active' : ''}`}  onClick={() => setCategory("")}>
                    All
                  </div>	
                {
                  categories.map((categoryItem, index)=> {                             
                    return (
                      <div key={index} className={`filter-item mr-15 ${categoryItem.name === category ? 'active' : ''}`}  onClick={() => setCategory(categoryItem.name)}>
                        {categoryItem.name}
                      </div>														
                    );
                  })
                } 	
                </div>
              </div>
            </div>

            <div className="row align-items-center">
            	{items.map((item , index) => (
	              <div className="col-lg-3 col-sm-6 col-xs-12">
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
    </section>
  )
}

export default ListedContainer;