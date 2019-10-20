



import React, { Component } from 'react';
import ReactDOM from "react-dom";
import styles from './styles.css';
import axios from 'axios';
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

class MainShop extends Component {


  state = {
    isLoadingInc: false,
    users: null,
    total: null,
    per_page: null,
    current_page: 1,
    shopProducts:[]
  }


  async componentDidMount() {
      
   this.makeHttpRequestWithPageNumber(1);
   

  
   
  }
  makeHttpRequestWithPageNumber= async pageNumber => {
    this.setState({ isLoadingInc: true });
    //this.makeHttpRequestWithPage(1);
     try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:9000/api/v1/shopProducts?page=${pageNumber}`,

        withCredentials: true
      });
     
      
        this.setState({shopProducts:res.data.results.products})
     
        if(res.data){
            this.setState({
                 isLoadingInc: false,
                 total:res.data.total,
                 current_page: pageNumber,
                 
                 per_page:res.data.per_page
                 });
        }

     
      

    }catch(err){
      console.log(err)
    }

  }


  makeHttpRequestWithPage = async pageNumber => {
   this.setState({isLoadingInc:true})
    const response = await fetch(`https://reqres.in/api/users?page=${pageNumber}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
 
    console.log(data);

    this.setState({
      users: data.data,
      total: 12,
      per_page: 6,
      current_page: data.page,
      isLoadingInc:false
    });
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


  


  render() {

    let users, renderPageNumbers;

    if ( this.state.shopProducts !== null) {
      users =  this.state.shopProducts.map(product => (
   
        
          <img
            
            className="mainPageImage" 
            key={product.id}
            onClick={()=>this.getProductDetail(product.id)}
            src={`http://localhost:9000/img/shopProducts/${product.imageCover}`} />
           
      ));
    }

    const pageNumbers = [];
    if (this.state.total !== null) {
      for (let i = 1; i <= Math.ceil(this.state.total / this.state.per_page); i++) {
        pageNumbers.push(i);
      }


      renderPageNumbers = pageNumbers.map(number => {
        let classes = this.state.current_page === number ? styles.active : '';
       

        return (
          <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
        );
      });
    }

    return (

        <div>
  {this.state.isLoadingInc ? (
          <Dimmer active style={{  opacity: "0.5" }}>
             Loading ...
            <Loader />
          </Dimmer>
        ) : (

      <div className={styles.app} style={{marginTop:'5%'}}>

        
            {users}
        


        <div className='pagination'>
          <span onClick={() => this.makeHttpRequestWithPageNumber(1)}>&laquo;</span>
          {renderPageNumbers}
          <span onClick={() => this.makeHttpRequestWithPageNumber(1)}>&raquo;</span>
        </div>

      </div>)
  }
      </div>
    );
  }

}

export default MainShop;
