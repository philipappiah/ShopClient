import React from "react";
import { getCartItemsList, fetchUser, addToCart } from "../Actions";
import { connect } from "react-redux";
import StepFormOne from './FormSteps/stepFormOne';
import StepFormTwo from './FormSteps/stepFormTwo';
import StepThree from './FormSteps/stepFormThree';
import StepFour from './FormSteps/stepFormFour';





export class Checkout extends React.Component {
  state = {
    isLoadingInc: false,
    isLoadingDecr: false,
    productImageUrl: "",
    description: "",
    prodId: "",
    price: "",
    name: "",
    count: 0,
    step : 0,
    totalProductsCost: 0
  };

  inc1({ product }) {
    this.setState({ isLoadingInc: true });

    this.inc(1, product);
  }
  dec1({ product }) {
    this.setState({ isLoadingDecr: true });
    this.inc(-1, product);
  }
  inc(n, productId) {
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
      product: productId,
      user: userId,
      quantity: n
    }; 
    // console.log(cartItem);
    this.props.addToCart(cartItem);
  }

  async componentDidMount() {
      console.log(this.props)
    this.setState({ isLoading: false });
    this.props.getCartItemsList();
    this.props.fetchUser();
  }

  setStep = (n) =>{
    
   
    this.setState({step:n})
  }

  calculateTotal = () => {
    let totalCost = 0;
    this.props.cartList.map(product => {
      product.forEach(element => {
        let productPrice = parseInt(element.product.price) * parseInt(element.quantity);
        totalCost += productPrice;
     
        //this.setState({prodId:element.product._id})
        // console.log(element.product.name)
      });
    })
    

   return totalCost;
    

  }

  render() {
    this.calculateTotal();
    if (this.props.cartList.length > 0) {
      this.props.cartList.map(product => {
      
        product.forEach(element => {
          //this.setState({prodId:element.product._id})
          // console.log(element.product.name)
        });
      });
    }

    return (
      <React.Fragment>
        <div class="ui breadcrumb" style={{ marginLeft: "30%" }}>
          <a class="section">Home</a>
          <div
            class="divider"
            style={{ fontSize: "20px", fontWeight: "bolder" }}
          >
            /
          </div>
          <a class="section">Product</a>
          <div
            class="divider"
            style={{ fontSize: "20px", fontWeight: "bolder" }}
          >
            /
          </div>
          <div class="active section">
            <a>Cart</a>
          </div>
        </div>

      
  

        {/* <Tab panes={panes} style={{marginTop:'10px'}} /> */}
        {/* <Tab
          menu={{ fluid: true, vertical: true }}
          menuPosition="right"
          panes={panes}
        /> */}
       
       {this.state.step === 0?
       ( <StepFormOne stepChosen = {this.setStep} totalPrice = {this.calculateTotal()} />)

       :<div></div>
      
      }

{this.state.step === 1?
       ( <StepFormTwo stepChosen = {this.setStep} totalPrice = {this.calculateTotal()}/>)

       :<div></div>
      
      }

{this.state.step === 2?
       ( <StepThree stepChosen = {this.setStep} totalPrice = {this.calculateTotal()} cartData = {this.props.cartList} />)

       :<div></div>
      
      }

{this.state.step === 3?
       ( <StepFour stepChosen = {this.setStep} totalPrice = {this.calculateTotal()} cartData = {this.props.cartList} />)

       :<div></div>
      
      }


        
        
       
        
        
          


        
        
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { cartList: state.cartList, users: state.users, carts: state.carts };
};

export default connect(
  mapStateToProps,
  { getCartItemsList, fetchUser, addToCart }
)(Checkout);
