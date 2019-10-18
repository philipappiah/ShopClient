import React from "react";
import Span from "./userSpan";
import  ReactDOM  from 'react-dom'


export class NavBarTop extends React.Component {


    componentDidMount(){
       // window.addEventListener('scroll', this.handleScroll);
    }
   
  onActionClick() {
    let mainNav = document.getElementById("js-menuTop");

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
    return (
      <React.Fragment>
        <nav className="navbarTop" id="navbarTop" style={{ background: "#444" }}>
          <span
            onClick={this.onActionClick}
            className="navbarTop-toggle"
            id="js-navbar-toggle"
          >
            <i className="fas fa-bars"></i>
          </span>
          <a href="/" className="nav__el logo">
            VIT Pay
          </a>

          <form className="nav__search " style={{ marginTop: "9px" }}>
            <button className="nav__search-btn">
              <svg>
                <use href="img/icons.svg#icon-search"></use>
              </svg>
            </button>
            <input
              type="text"
              placeholder="Search transactions"
              className="nav__search-input"
            />
            <button className="nav__el nav__el--cta nav-links">search</button>
          </form>

          <ul className="main-nav" id="js-menuTop">
            <li>
              <a href="#" className="nav__el nav-links">
                My Transactions
              </a>
            </li>
            
            <Span />
          </ul>
        </nav>
      </React.Fragment>
    );
  }
}

export default NavBarTop;
