import React from 'react';





export class ErrorPage extends React.Component{




    render(){
        return (
            <React.Fragment>
            <h2 className="heading-secondary.heading-secondary--error">oh! Something went wrong!</h2>  
            <h2 className="error__emoji"> 😢 🤯</h2>  
            </React.Fragment>
       
            
        )
    }
}


export default ErrorPage;
