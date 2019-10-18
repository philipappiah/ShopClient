import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchUser } from "./Actions";
import defaultPhoto from "./img/users/default.jpg";
import Logout from "./Logout";

export class Span extends React.Component {
  state = {
    name: "",
    action: "Sign Up",
    actionSignUp: "Login",
    imageHref :'/',
    userImage:''
  };

  async componentDidMount() {
    //   this.props.fetchUser();
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:9000/",

        withCredentials: true
      });

      if (res.data.user.name) {
        this.setState({ name: res.data.user.name });
        this.setState({ action: "Logout" });
        this.setState({ actionSignUp: " " });
        this.setState({imageHref:'/account'});
        this.setState({userImage:res.data.user.photo})
      }
       



     
      // console.log(res);
      //axer.push(res.data.user)
      // return res.data.user.name;
    } catch (err) {
      console.log("error", err.response);
      //showAlert('error',err.response.data.message);
    }
  }

  onActionClick = async event => {
    event.preventDefault();
    if (this.state.action === "Logout") {
      Logout();
    } else {
      window.location.assign("/SignUp");
    }
  };

  render() {
    return (
      <React.Fragment>
          <li>
              <a href={this.state.imageHref}>
                {this.state.userImage?
                (<img src={`http://localhost:9000/img/users/${this.state.userImage}`} alt='profile' className="nav__user-img nav-links" />)
                :  (<img src='http://localhost:9000/img/users/default.jpg' alt='profile' className="nav__user-img nav-links" />)

                }
              </a>
            </li>
        <li >
          <a  href="/account" className=" nav-links">{this.state.name.split(" ")[0].toUpperCase()}</a>
        </li>
        {/* <span>&nbsp;&nbsp;</span>
        <span>&nbsp;&nbsp;</span> */}
        <li>
          <a href="/signIn" className="nav__el nav-links">
            {this.state.actionSignUp}
          </a>
        </li>
        
        <li>
          <button
            onClick={this.onActionClick}
            className="nav__el nav__el--cta nav-links"
          >
            {this.state.action}
          </button>
        </li>
      </React.Fragment>
    );
  }
}


const mapStateToProps = state =>{
    return {user:state.users}
}

export default connect(mapStateToProps, {fetchUser})(Span);
