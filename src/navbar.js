import React from "react";
import Span from "./userSpan";
import  ReactDOM  from 'react-dom';
import { getTotalCartItems } from "./Actions";
import { connect } from "react-redux";
import NotificationBadge from "react-notification-badge";

export class NavBar extends React.Component {


  state = {
    count:0
  }

  async componentDidUpdate (){
    //this.props.getTotalCartItems;
    
  }
    async componentDidMount(){
      this.props.getTotalCartItems();
      
      
    }

 
   
  onActionClick() {
    let mainNav = document.getElementById("js-menu");

    mainNav.classList.toggle("active");
  }

  handleScroll = ()=>{
    var n = document.getElementById("navbar");
    var navbar = ReactDOM.findDOMNode(n);
   
    var sticky = navbar.offsetTop;
    
  
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
   
}

  render() {
    let container = {
      height: "10px",
     
      display: "inline-block",
     
     
    };

    let cartTotal = 0;

    if(this.props.cartItemsTotal.length > 0){
      console.log(this.props.cartItemsTotal)
      this.props.cartItemsTotal.map((items)=>{
        items.forEach(element => {
          cartTotal += element.quantity;
          
        });
        
      })
    }

  

  

   
  
  
    return (
      
      <React.Fragment>
        <nav className="navbar" id="navbar" style={{ background: "#444" }}>
          <span
            onClick={this.onActionClick}
            className="navbar-toggle"
            id="js-navbar-toggle"
          >
            <i className="fas fa-bars"></i>
          </span>
          <a href="/" className="nav__el logo">
            VIT shop
          </a>

          <form className="nav__search " style={{ marginTop: "9px" }}>
            <button className="nav__search-btn">
              <svg>
                <use href="img/icons.svg#icon-search"></use>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search shop"
              className="nav__search-input"
            />
            <button className="nav__el nav__el--cta nav-links">search</button>
          </form>

          <ul className="main-nav" id="js-menu">
            <li>
              <a href="#" className="nav__el nav-links">
                My Transactions
              </a>
            </li>
            
            <Span />
            <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span>
            
        <li>
        <div style={container}>
            <NotificationBadge
              count={cartTotal}
            
              frameLength={120.0}
            />
            <a href="/shop/cart">
            <i style={{color:'white'}} className="fas fa-shopping-cart">cart</i>
            </a>
            </div>
            </li>
             
            
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { cartItemsTotal: state.cartItemsTotal };
};
//   function mapDispatchToProps(dispatch) {
//     return ({
//         fetchUser: () => dispatch(fetchUser())
//     })
// }

export default connect(
  mapStateToProps,
  { getTotalCartItems}
)(NavBar);


