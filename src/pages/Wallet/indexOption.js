import React from 'react';
import { fetchUser } from "../../Actions";
import { connect } from "react-redux";
import defaultPhoto from "../../img/users/default.jpg";


export class IndexOption extends React.Component {
    constructor(props){
        super(props)
    }

  componentDidMount() {
      this.props.fetchUser();
    
   
  
}

state = {
    keyVal:0
}




onActionClick = event => {
    var i;
      this.setState({keyVal:++i})
  this.props.data(event.target.innerText);



}



render(){
   
        return this.props.user.map((user, index)=>{
            return (
                
              <main className="main" key={index}>
                <div className="user-view">
                  <nav className="user-view__menu" style={{ background: "#444" }}>
                    <ul className="side-nav">
                      <li className="side-nav--active">
                        <a href="#">
                          <svg>
                            <use href="img/icons.svg#icon-settings"></use>
                          </svg>
                          <span key="1" onClick={e=>this.onActionClick(e)}>
                          Settings
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          <svg>
                            <use href="img/icons.svg#icon-briefcase"></use>
                          </svg>
                          <span key="2"  onClick={e=>this.onActionClick(e)} >
                          My transactions
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          <svg>
                            <use href="img/icons.svg#icon-star"></use>
                          </svg>
                          <span key="3" onClick={e=>this.onActionClick(e)}>
                          My Balance
                          </span>
                        </a>
                      </li>
                      <li>
                        <a href="javascript:void(0)">
                          <svg>
                            <use href="img/icons.svg#icon-credit-card"></use>
                          </svg>
                          <span key="4" onClick={e=>this.onActionClick(e)} >
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
                            <span key="5" onClick={e=>this.onActionClick(e)} >
                            Manage Wallet
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <svg>
                              <use href="img/icons.svg#icon-users"></use>
                            </svg>
                            <span key="6"  onClick={e=>this.onActionClick(e)} >
                            Manage Senders list
                            </span>
                          </a>
                        </li>
                        <li>
                          <a href="javascript:void(0)">
                            <svg>
                              <use href="img/icons.svg#icon-star"></use>
                            </svg>
                            <span key="7"  onClick={e=>this.onActionClick(e)} >
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
                      <form className="form form-user-data">
                        <div className="form__group">
                          <label className="form__label" htmlFor="name">
                            Name
                          </label>
                          <input
                            className="form__input"
                            id="name"
                            type="text"
                            value={user.name}
                          
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
                            value={user.email}
                         
                            required="required"
                          />
                        </div>
                        <div className="form__group form__photo-upload">
                          <img
                            className="form__user-photo"
                            src={defaultPhoto}
                            alt="User photo"
                          />
                          <a className="btn-text" href="">
                            Choose new photo
                          </a>
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
                      <form className="form form-user-settings">
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
            );
          })
    
}



}

const mapStateToProps = state => {
    return { user: state.users };
  };

  
  export default connect(
    mapStateToProps,
    { fetchUser }
  )(IndexOption);
  