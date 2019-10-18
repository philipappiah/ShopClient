import React from "react";
import Settings from './Wallet/settings';
import CreateWallet from './Wallet/createWallet';
import GetBalance from './Wallet/getWalletBalance';
import Transactions from './Wallet/getTransactions';



export class Account extends React.Component {
   

    state = {
        optionDefault: true,
        optionSettings: false,
        optionCreateWallet:false,
        optionGetTransactions:false,
        optionGetMyBalance:false


    }
  


  onActionClick = (targetText) => {
      
      if(targetText === 'CREATE WALLET'){
        this.setState({optionCreateWallet:true})
        this.setState({optionSettings:false})
        this.setState({optionGetMyBalance:false})
         this.setState({optionGetTransactions:false})
         this.setState({optionDefault:false})

      }else
      if(targetText === 'SETTINGS'){
       
        this.setState({optionCreateWallet:false})
        this.setState({optionGetMyBalance:false})
        this.setState({optionGetTransactions:false})
        this.setState({optionSettings:true})
        this.setState({optionDefault:false})


      }
      else
      if(targetText === 'MY BALANCE'){
          this.setState({optionGetMyBalance:true})
          this.setState({optionSettings:false})
          this.setState({optionCreateWallet:false})
          this.setState({optionGetTransactions:false})
          this.setState({optionDefault:false})

      }
      else
      if(targetText === 'MY TRANSACTIONS'){
          this.setState({optionGetTransactions:true})
          this.setState({optionGetMyBalance:false})
          this.setState({optionSettings:false})
          this.setState({optionCreateWallet:false})
          this.setState({optionDefault:false})

      }
 
  }


  render() {

    if(this.state.optionCreateWallet){
        return <CreateWallet selected='side-nav--active' unselected='' data = {this.onActionClick}/>
    }

    if (this.state.optionSettings){
        return <Settings selected='side-nav--active' unselected='' data = {this.onActionClick}/>
    }

    if(this.state.optionGetMyBalance){
        return <GetBalance selected='side-nav--active' unselected=''  data = {this.onActionClick}/>
    }
    if(this.state.optionGetTransactions){
        return <Transactions selected='side-nav--active' unselected=''  data = {this.onActionClick}/>

    }

    if(this.state.optionDefault){

    return <Settings selected='side-nav--active' unselected='' data = {this.onActionClick}/>
    }

  


   


}
}




    

export default Account;
