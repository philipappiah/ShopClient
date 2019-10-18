import React from 'react';






export class GetBalance extends React.Component{


  onActionClick = event => {
  
    this.props.data(event.target.innerText);
  
  
  
  }



    render(){
        return(
            <main className ="main">
            <div className="user-view">
              <nav className ="user-view__menu" style={{ background: "#444" }}>
                <ul className="side-nav">
                  <li>
                    <a href="javascript:void(0)">
                      <svg>
                        <use href="img/icons.svg#icon-settings"></use>
                      </svg>
                      <span  onClick={e=>this.onActionClick(e)} >
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
                  <li className = {this.props.selected}>
                    <a href="javascript:void(0)">
                      <svg>
                        <use href="img/icons.svg#icon-star"></use>
                      </svg>
                      <span  onClick={e=>this.onActionClick(e)} >
                      My Balance
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <svg>
                        <use href="img/icons.svg#icon-credit-card"></use>
                      </svg>
                      <span  onClick={e=>this.onActionClick(e)} >
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
                        Manage Wallet
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <svg>
                          <use href="img/icons.svg#icon-users"></use>
                        </svg>
                        Manage Senders list
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">
                        <svg>
                          <use href="img/icons.svg#icon-star"></use>
                        </svg>
                        Manage Recipients list
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
                  <h2 className="heading-secondary ma-bt-md">Wallet Balance</h2>
                  <form className="form form-user-data">
                    <div className="form__group">
                      <label className="form__label" for="name">
                        Balance
                      </label>
                      <input
                        class="form__input"
                        id="name"
                        type="text"
                        value='100 GHS'
                        required="required"
                      />
                    </div>
                    <div className="form__group ma-bt-md">
                      <label className="form__label" for="phone">
                        Phone Number
                      </label>
                      <input
                        className="form__input"
                        id="phone"
                        type="text"
                        placeholder="024644524"
                        required="required"
                      />
                    </div>
                    
                    <div className="form__group right">
                      <button className="btn btn--small btn--green">
                        Create Wallet 
                      </button>
                    </div>
                  </form>
                </div>
                <div className="line">&nbsp;</div>
            
              </div>
            </div>
          </main>
        )
    }
}

export default GetBalance;