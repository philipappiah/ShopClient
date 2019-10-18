
import React from "react";
import { getCartItemsList, fetchUser, addToCart } from "../Actions";
import { connect } from "react-redux";

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




export class ShopCart extends React.Component {
  state = {
    isLoadingInc: false,
    isLoadingDecr: false,
    productImageUrl: "",
    description: "",
    prodId: "",
    price: "",
    name: "",
    count: 0,
    step: 0,
    totalProductsCost: 0,
    
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
    this.setState({ isLoading: false });
    this.props.getCartItemsList();
    this.props.fetchUser();
    console.log(this.props);
  }

  checkout = () => {
    window.location.href = "/shop/checkout";
  };

  setStep = n => {
    this.setState({ step: n });
  };

  calculateTotal = () => {
    let totalCost = 0;
    this.props.cartList.map(product => {
      product.forEach(element => {
        let productPrice =
          parseInt(element.product.price) * parseInt(element.quantity);
        totalCost += productPrice;

        //this.setState({prodId:element.product._id})
        // console.log(element.product.name)
      });
    });

    return totalCost;
  };

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

        {this.state.isLoadingDecr ? (
          <Dimmer active style={{ backgroun: "white", opacity: "0.5" }}>
            In progress ...
            <Loader />
          </Dimmer>
        ) : (
          <div className="card-shop-cart">
          
            <h2>CART ITEMS</h2>

            {this.props.cartList ? (
              this.props.cartList.map(product =>
                product.map(item => (
                  <div class="ui divided items" style={{ width: "80%" }}>
                    <div class="item">
                      <div class="image">
                        <img
                          src={`http://localhost:9000/img/shopProducts/${item.product.imageCover}`}
                          style={{ borderRadius: "10px" }}
                        />
                      </div>
                      <div class="content">
                        <input
                          type="hidden"
                          value={item.product._id}
                          className="productId"
                        />
                        <div class="extra">
                          <div className="addToCartBtn">
                            <button
                              onClick={this.dec1.bind(this, {
                                product: item.product._id
                              })}
                              className="btn-addToCart"
                              style={{ width: "25%" }}
                            >
                              Remove from Cart
                            </button>
                          </div>
                        </div>
                        <div class="meta">
                          <span class="cinema">GHS {item.product.price}</span>
                        </div>
                        <div class="description">
                          {item.product.description}
                        </div>
                        <div class="extra">
                          <div class="ui label">Quantity: {item.quantity}</div>
                          <div class="ui label">
                            <i aria-hidden="true" class="globe icon"></i>
                            Additional Info
                          </div>
                        </div>
                      </div>
                    </div>

                    <hr></hr>
                  </div>
                ))
              )
            ) : (
              <li>Unavailable</li>
            )}
          </div>
        )}

        <div style={{position:"absolute", right:'30%', marginTop:'10px'}}>
          <button
            onClick={this.checkout}
            className="btn-addToCart"
           
            
          >
            Proceed to checkout
          </button>
        </div>
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
)(ShopCart);
