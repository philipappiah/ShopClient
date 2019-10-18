
import React, { Component } from "react";
import axios from "axios";
import {showAlert} from "./alerts";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";

export class SignUp extends React.Component {
   constructor(props) {
        super(props)
        this.state = { isLoading: true }
    }

  state = {
    name: "",
    email: "",
    password:"",
    passwordConfirm:"",
    isLoadingInc: false,
  };

  onFormSubmit = async event => {
   
    event.preventDefault();
    this.setState({ isLoadingInc: true });
   


    try {
      // axios.defaults.withCredentials = true;
      const res = await axios({
        method: "POST",
        url: "http://localhost:9000/api/v1/users/signup",

        data: {
          name: this.state.name,
          email:this.state.email,
          password: this.state.password,
          passwordConfirm: this.state.passwordConfirm
        },
        withCredentials: true
      });
      

      if (res.data.status === "success") {
        this.setState({ isLoadingInc: false });
       
        showAlert('success',' Registration successful. Please check your email to verify your account!');
        console.log(res.data);
        window.setTimeout(()=>{
          window.location.assign('/');
      }, 1500)
      }
    } catch (err) {
      this.setState({ isLoadingInc: false });
       showAlert('error',err.response.data.message);
    }
  };


 

    
    

  render() {
    return (
      <React.Fragment>
        
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Become part of our family</h2>
          <form onSubmit={this.onFormSubmit} className="form">
         
            <div className="form__group">
              <label className="form__label" htmlFor="fullname">
                Full name
              </label>
              <input
                className="form__input"
                id="fullname"
                type="fullname"
                placeholder="Anthony Joshua"
                required="required"
                onChange={e => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="form__group">
              <label className="form__label" htmlFor="email">
                Email
              </label>
              <input
                className="form__input"
                id="email"
                type="email"
                placeholder="anthonyJoshua@example.com"
                required="required"
                onChange={e => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="password">
                Password
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
            <div className="form__group ma-bt-md">
              <label className="form__label" htmlFor="passwordConfirm">
                Confirm Password
              </label>
              <input
                className="form__input"
                id="passwordConfirm"
                type="password"
                placeholder="••••••••"
                required="required"
                min="8"
                onChange={e => this.setState({ passwordConfirm: e.target.value })}
              />
            </div>
            <div className="form__group">
              <button className="btn btn--green">
              {this.state.isLoadingInc ? (
                  <Dimmer active style={{backgroundColor: '#55c57a' }}>
                    
                    <Loader />
                  </Dimmer>
                ) : (
                  <Dimmer style={{ backgroundColor: '#55c57a' }}>
                    <Loader />
                  </Dimmer>
                )}
                
                
                Sign Up</button>
            </div>
          </form>
        </div>
      </main>
    
  </React.Fragment>
    );
  }
}

