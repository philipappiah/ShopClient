import React from "react";

import { ProductCard,TaggedContentCard} from 'react-ui-cards';
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Beforeunload } from 'react-beforeunload';
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import {
  Dimmer,
  Loader,
  Tab,
  Checkbox,
  Form,
  Input,
  TextArea,
  Button,
  Select
} from "semantic-ui-react";



const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const data = [];

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.onMessage = this.onMessage.bind(this);
   
     
  }

  state = {
    shopProducts:[],
    productId:'',
    isLoadingInc: false
  }

  onMessage(message) {
    console.log(message);
}


 
  async componentDidMount(){
    this.setState({isLoadingInc:true})
   
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:9000/api/v1/shopProducts",

        withCredentials: true
      });
      console.log(res.data.results);
      
        this.setState({shopProducts:res.data.results.products})
        this.setState({isLoadingInc:false})

     
      
     
      console.log(this.state.shopProducts)
    }catch(err){
      console.log(err)
    }

  }


  getProductDetail=(value)=>{
  
    
     
   
    this.props.history.push({
      pathname:"/shop/product",
      state:{
          key:value
       }
     });

    //window.location.assign("/shop/product");
  }



  onActionClick = async event => {
    event.preventDefault();
    window.location.assign("/send");
  };

  render() {
    return (
      
      <React.Fragment>
        
        <Beforeunload onBeforeunload={(e) => this.keepOnPage(e)} />

        {this.state.isLoadingInc ?

        (<Loader/>):(
          <div>
        
        <section className="hero">
          <div className="hero-inner">
            <h1>WELCOME TO VIT SHOP</h1>
            <h2>Have a look at our offers and bask in its amazing glory!</h2>
            <Link to={{pathname: '/shop/MainShop', state: { from: this.props.location.pathname }}} className="mybtn" >
              Shop
            </Link>
           
             
          </div>
        </section>

        <div className="carousel">
            <Carousel
             swipeable={true}
             draggable={true}
            
             responsive={responsive}
             ssr={true} // means to render carousel on server-side.
             infinite={true}
            
             keyBoardControl={true}
            
             containerClass="carousel-container"
             //removeArrowOnDeviceType={["tablet", "mobile"]}
             deviceType={this.props.deviceType}

            
            >
               
           {
                    this.state.shopProducts.map((product, i) => (
                     
              <div className="container" key={i}  onClick={()=>this.getProductDetail(product.id)}>
              <div className="card" >
              <TaggedContentCard 
       
          thumbnail={`http://localhost:9000/img/shopProducts/${product.imageCover}`}
          title={product.name}
          //description='a cake with raspberries'
          tags={[
            `GHS ${product.price}`,
            // 'cake',
            // 'fruits'
          ]}
        />
             
            
            
                {/* <img key={i} className="myCarouselImage" src={`http://localhost:9000/img/shopProducts/${product.imageCover}`} />
                  */}
                  {/* <div class="button">
               
                 <p><a href="#">VIEW </a></p>
                </div> */}

              
                
                
               
              
                </div>
                
              </div>
               ))}

          
               
            </Carousel>
          </div>
          </div>
        )}
        
              
              


               

          
               
          
       
        
          
      </React.Fragment>

      // this.state.isLoading ? <Loader/> :
    );
  }
}
