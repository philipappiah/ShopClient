import React, { Component } from "react";
import axios from "axios";
import {showAlert} from "./alerts";
import { Dimmer, Loader, Image, Segment } from "semantic-ui-react";


export class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    isLoadingInc: false,
  };

  onFormSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoadingInc: true });
   


    try {
      // axios.defaults.withCredentials = true;
      const res = await axios({
        method: "POST",
        url: "http://localhost:9000/api/v1/users/login",

        data: {
          email: this.state.email,

          password: this.state.password
        },
        withCredentials: true
      });
      

      if (res.data.status === "success") {
        this.setState({ isLoadingInc: false });
       
        showAlert('success','Logged in successfully!');
        
        window.setTimeout(()=>{
          window.location.assign('/');
      }, 1500)
      }
    } catch (err) {
   
      
       showAlert('error',err.response.data.message);
       this.setState({ isLoadingInc: false });
    }
  };

  componentDidMount() {
   
  }

  togglePassword = () => {
    if (this.state.inputType === "password") {
      this.setState({
        inputType: "text"
      });
    } else {
      this.setState({
        inputType: "password"
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        
          <main className="main">
            <div className="login-form">
              <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
              <form onSubmit={this.onFormSubmit} className="form">
             
                <div className="form__group">
                  <label className="form__label" htmlFor="email">
                    Email address
                  </label>
                  <input
                    className="form__input"
                    id="email"
                    type="email"
                    placeholder="you@example.com"
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
                
                    
                    
                    Login</button>
                </div>
              </form>
            </div>
          </main>
        
      </React.Fragment>
    );
  }
}
