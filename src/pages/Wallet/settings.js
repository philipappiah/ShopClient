import React from 'react';
import { fetchUser } from "../../Actions";
import { connect } from "react-redux";
import defaultPhoto from "../../img/users/default.jpg";
import axios from 'axios';
import {showAlert} from "../../alerts";
import { file } from '@babel/types';



export class Settings extends React.Component {
  state = {
    username: "",
    email: "",
    currentPassword:"",
    password:"",
    passwordConfirm:"",
    userImage:""
    
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
        this.setState({ username: res.data.user.name });
        this.setState({email:res.data.user.email});
        this.setState({userImage:res.data.user.photo})
      }

      console.log(res.data);
      // console.log(res);
      //axer.push(res.data.user)
      // return res.data.user.name;
    } catch (err) {
      console.log("error", err.response);
      // showAlert('error',err.response.data.message);
    }
  }


onActionClick = (event) =>{
    
  this.props.data(event.target.innerText);



}

updateUserPassword = async (e) => {
  e.preventDefault();

  let currPassword, pass, passConfirm
  currPassword = this.state.currentPassword
  pass = this.state.password
  passConfirm = this.state.passwordConfirm


try {
  const res = await axios({
    method: "PATCH",
    url: "http://localhost:9000/api/v1/users/updateMyPassword",
    data:{
      passwordCurrent:currPassword,
      password:pass,
      passwordConfirm:passConfirm

    },


    withCredentials:true
  });


  if (res.data.status === "success") {
    showAlert("success", 'Your password has been updated successfully');
   
  }
}catch(err){
  showAlert("error", err.response.data.message);
  
}
}

updateUserDetails = async (e) => {
  //alert(this.state.userImage);


  e.preventDefault();
  

  const form = new FormData();
  form.append('photo', document.getElementById('photo').files[0]);

  try {
    const res = await axios({
      method: "PATCH",
      url: "http://localhost:9000/api/v1/users/updateMe",
      data:form,

  
      withCredentials:true
    });

    console.log(res.data);
    if (res.data.status === "success") {
      showAlert("success", "updated successfully!");
     
    }
  }catch(err){
    showAlert("error", "Failed to update. Please try again later.");
    
  }
}






render(){
   return(
      
              <main className="main">
             
                <div className="user-view">
                  <nav className="user-view__menu" style={{ background: "#444" }}>
                    <ul className="side-nav">
                      <li className = {this.props.selected}>
                        <a href="javascript:void(0)">
                          <svg>
                            <use href="img/icons.svg#icon-settings"></use>
                          </svg>
                          <span  onClick={e=> this.onActionClick(e)}>
                          Settings
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          <svg>
                            <use href="img/icons.svg#icon-briefcase"></use>
                          </svg>
                          <span  onClick={e=>this.onActionClick(e)} >
                          My transactions
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          <svg>
                            <use href="img/icons.svg#icon-star"></use>
                          </svg>
                          <span onClick={e=>this.onActionClick(e)}>
                          My Balance
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          <svg>
                            <use href="img/icons.svg#icon-credit-card"></use>
                          </svg>
                          <span  onClick={e=>this.onActionClick(e) } >
                          Create Wallet
                          </span>
                        </a>
                      </li>
                    </ul>
                    <div className="admin-nav">
                      <h5 className="admin-nav__heading">Admin</h5>
                      <ul className="side-nav">
                        <li>
                          <a href="javascript:void(0)">
                            <svg>
                              <use href="img/icons.svg#icon-map"></use>
                            </svg>
                            <span  onClick={e=>this.onActionClick(e)} >
                            Manage Wallet
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <svg>
                              <use href="img/icons.svg#icon-users"></use>
                            </svg>
                            <span  onClick={e=>this.onActionClick(e)} >
                            Manage Senders list
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <svg>
                              <use href="img/icons.svg#icon-star"></use>
                            </svg>
                            <span  onClick={e=>this.onActionClick(e)} >
                            Manage Recipients list
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <svg>
                              <use href="img/icons.svg#icon-briefcase"></use>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                  <div className="user-view__content">
                    <div className="user-view__form-container">
                      <h2 className="heading-secondary ma-bt-md">Your account settings</h2>
                      <form className="form form-user-data" onSubmit={this.updateUserDetails}>
                        <div className="form__group">
                          <label className="form__label" htmlFor="name">
                            Name
                          </label>
                          <input
                            className="form__input"
                            id="name"
                            type="text"
                            defaultValue={this.state.username}
                          
                            required="required"
                          />
                        </div>
                        <div className="form__group ma-bt-md">
                          <label className="form__label" htmlFor="email">
                            Email address
                          </label>
                          <input
                            className="form__input"
                            id="email"
                            type="email"
                            defaultValue={this.state.email}
                         
                            required="required"
                          />
                        </div>
                        <div className="form__group form__photo-upload">
                          <img
                            className="form__user-photo"
                            src={`http://localhost:9000/img/users/${this.state.userImage}`}
                            alt="User photo"
                          />
                           
                          <input type="file"
                            className="form__upload"
                            id="photo"
                            name="photo"
                           
                            accept='image/*'
                           
                            style={{cursor:'pointer'}}

                          />
                           <label htmlFor="photo" style={{cursor:'pointer'}}>
                            Choose new photo
                          </label >
                        </div>
                        <div className="form__group right">
                          <button className="btn btn--small btn--green">
                            Save settings
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="line">&nbsp;</div>
                    <div className="user-view__form-container">
                      <h2 className="heading-secondary ma-bt-md">Password change</h2>
                      <form className="form form-user-settings" onSubmit={this.updateUserPassword}>
                        <div className="form__group">
                          <label className="form__label" htmlFor="password-current">
                            Current password
                          </label>
                          <input
                            className="form__input"
                            id="password-current"
                            type="password"
                            placeholder="••••••••"
                            required="required"
                            onChange={e => this.setState({ currentPassword: e.target.value })}
                            min="8"
                          />
                        </div>
                        <div className="form__group">
                          <label className="form__label" htmlFor="password">
                            New password
                          </label>
                          <input
                            className="form__input"
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required="required"
                            min="8"
                            onChange={e => this.setState({ password: e.target.value })}
                          />
                        </div>
                        <div className="form__group ma-bt-lg">
                          <label className="form__label" htmlFor="password-confirm">
                            Confirm password
                          </label>
                          <input
                            className="form__input"
                            id="password-confirm"
                            type="password"
                            placeholder="••••••••"
                            required="required"
                            min="8"
                            onChange={e => this.setState({ passwordConfirm: e.target.value })}
                          />
                        </div>
                        <div className="form__group right">
                          <button className="btn btn--small btn--green">
                            Save password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </main>
          
        
   )
}



}

const mapStateToProps = state => {
    return { user: state.users };
  };

  
  export default Settings;  
  