import React, { Component } from 'react';
import Contacts from '../List'


    export class Users extends React.Component{
    constructor(){
      super();
           
  }

  state = {
    users: []
  }



      componentDidMount() {
        fetch('http://localhost:9000/users')
        .then(res => res.json())
        .then((data) => {
            
          this.setState({ users:data.data.userModel })
          console.log(data);
          console.log(typeof(this.state.users))
        })
        .catch(console.log)
      }
      render() {
        return (
          <div className="container">
        <div className="col-xs-12">
        <h1>My Todos</h1>
        {this.state.users.map((data) => (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{data.name} {" "} {data.email}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                  
              </h6>
            </div>
          </div>
        ))}
        </div>
       </div>
    
  
        );
      }
    }

    