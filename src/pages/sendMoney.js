import React from 'react';



export class SendMoney extends React.Component{

    constructor(props) {
        super(props)
        this.state = { isLoading: true }
    }

    componentDidMount(){
        setTimeout(() => { 
          this.setState({isLoading: false})
        },2000)
    } 
      


    render(){
        return (
            // this.state.isLoading ? <Loader/> :
           
            <div className="selectButton1">
            <button className="btn btn-- btn--large">Card Transfer</button>
            <br/><br/>
            <button className="btn btn-- btn--large">Bitcoin to Wallet</button>
            <br/><br/>
            <button className="btn btn-- btn--large">Ether to Wallet</button>
            </div>
          
             
        )
    }




}

export default SendMoney;