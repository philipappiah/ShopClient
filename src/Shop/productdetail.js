import React from "react";
import axios from "axios";

import { fetchUser, addToCart } from "../Actions";
import { connect } from "react-redux";

import { ProductCard, TaggedContentCard } from "react-ui-cards";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";
//import "react-awesome-button/dist/styles.css";

export class DetailPage extends React.Component {
  state = {
    isLoadingInc: false,
    isLoadingDecr: false,
    productImageUrl: "",
    description: "",
    price: "",
    name: "",
    count: 0,
  };

  inc1() {
    this.setState({ isLoadingInc: true });
    this.inc(1);
  }
  dec1() {
    this.setState({ isLoadingDecr: true });
    this.inc(-1);
  }
  inc(n) {
    
    let count = this.state.count + n;
    if (count < 0) count = 0;
    this.setState({
      count: count
    });

    let userId;
    if (this.props.users.length > 0) {
      this.props.users.map(user => {
        userId = user.id;
        //console.log(user.name)
      });
    }

    const cartItem = {
      product: this.props.location.state.key,
      user: userId,
      quantity: n
    };
    this.props.addToCart(cartItem);
  }

  async componentDidMount() {
    this.props.fetchUser();

    this.setState({ isLoading: false });
    if (this.props) {
      const product = this.props.location.state.key;
      try {
        const res = await axios({
          method: "GET",
          url: `http://localhost:9000/api/v1/shopProducts/${product}`,

          withCredentials: true
        });
        this.setState({
          productImageUrl: res.data.result.product.imageCover,
          description: res.data.result.product.description,
          name: res.data.result.product.name,
          price: res.data.result.product.price
        });

        //  console.log(res.data.result);
      } catch (err) {
        console.log(err);
      }
    }
  }

  render() {
 

    if (this.props.users.length > 0) {
      this.props.users.map(user => {
        //console.log(user.name);
      });
      //   console.log(this.props.users);
      //   console.log(this.props.carts);
    }
    return (
      <React.Fragment>
        
        
       
         
<div style={{marginTop:'10%'}}>
        
          <div class="ui divided items" >
<div class="item">
  <div class="image" style={{width:'30%'}}><img src={`http://localhost:9000/img/shopProducts/${this.state.productImageUrl}`}  style={{borderRadius:'10px'}} /></div>
  <div class="content">
  
    <div class="meta"><span class="cinema">GHS {this.state.price}</span></div>
    <div class="description">
  
       
     
      {this.state.description}
    </div>
    <div class="extra">
    <div className="addToCartBtn">
              <button
                onClick={this.inc1.bind(this)}
                className="btn-addToCart"
                style={{ width: "25%" }}
              >
                {this.state.isLoadingInc ? (
                  <Dimmer active style={{ background: "orange" }}>
                    In progress ...
                    <Loader />
                  </Dimmer>
                ) : (
                  <Dimmer style={{ background: "orange" }}>
                    <Loader />
                  </Dimmer>
                )}
                Add to cart
              </button>
              <br></br>
              <br></br>
              <button
              
                onClick={this.dec1.bind(this)}
                className="btn-addToCart"
                style={{ width: "25%" }}
              >
                 {this.state.isLoadingDecr ? (
                  <Dimmer active style={{ background: "orange" }}>
                    In progress ...
                    <Loader />
                  </Dimmer>
                ) : (
                  <Dimmer style={{ background: "orange" }}>
                    <Loader />
                  </Dimmer>
                )}
               
                Remove from Cart 
              </button>
            </div>
      
      <div class="ui label">
        <i aria-hidden="true" class="globe icon"></i>
        Additional Info
      </div>
    </div>
  </div>
</div>
<hr></hr>
</div>
          

            
          </div>
         

  

     


  
        <table class="ui celled padded table" style={{width:'60%'}}>
  <thead class="">
    <tr class="">
      <th class="single line">Specifications</th>
      <th class="">Effect</th>
      <th class="">Efficacy</th>
      <th class="">Consensus</th>
      <th class="">Comments</th>
    </tr>
  </thead>
  <tbody class="">
    <tr class="">
      <td class=""><h2 class="ui center aligned header">A</h2></td>
      <td class="single line">Power Output</td>
      <td class="">
        <div class="ui star rating" role="radiogroup" tabindex="-1">
          <i
            tabindex="0"
            aria-checked="false"
            aria-posinset="1"
            aria-setsize="3"
            class="active icon"
            role="radio"
          ></i>
          <i
            tabindex="0"
            aria-checked="false"
            aria-posinset="2"
            aria-setsize="3"
            class="active icon"
            role="radio"
          ></i>
          <i
            tabindex="0"
            aria-checked="true"
            aria-posinset="3"
            aria-setsize="3"
            class="active icon"
            role="radio"
          ></i>
        </div>
      </td>
      <td class="right aligned">
        80%
        <br />
        <a href="#">18 studies</a>
      </td>
      <td class="">
        Creatine supplementation is the reference compound for increasing muscular creatine levels;
        there is variability in this increase, however, with some nonresponders.
      </td>
    </tr>
    <tr class="">
      <td class=""><h2 class="ui center aligned header">A</h2></td>
      <td class="single line">Weight</td>
      <td class="">
        <div class="ui star rating" role="radiogroup" tabindex="-1">
          <i
            tabindex="0"
            aria-checked="false"
            aria-posinset="1"
            aria-setsize="3"
            class="active icon"
            role="radio"
          ></i>
          <i
            tabindex="0"
            aria-checked="false"
            aria-posinset="2"
            aria-setsize="3"
            class="active icon"
            role="radio"
          ></i>
          <i
            tabindex="0"
            aria-checked="true"
            aria-posinset="3"
            aria-setsize="3"
            class="active icon"
            role="radio"
          ></i>
        </div>
      </td>
      <td class="right aligned">
        100%
        <br />
        <a href="#">65 studies</a>
      </td>
      <td class="">
        Creatine is the reference compound for power improvement, with numbers from one
        meta-analysis to assess potency
      </td>
    </tr>
  </tbody>
</table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { users: state.users, carts: state.carts };
};
//   function mapDispatchToProps(dispatch) {
//     return ({
//         fetchUser: () => dispatch(fetchUser())
//     })
// }

export default connect(
  mapStateToProps,
  { fetchUser, addToCart }
)(DetailPage);
