import React from 'react';

import {
    Dimmer,
    Loader,
    Tab,
    Checkbox,
    Form,
    Input,
    TextArea,
    Divider,
    Button,
    Select,
    Image,
    Transition,
    Icon,
    Step,
  } from "semantic-ui-react";


  


export class StepFormOne extends React.Component {
    state = {
        step:0,
        visible: true,
        userAddress:''
    }
    toggleVisibility = () =>{
    this.setState((prevState) => ({ visible: !prevState.visible }));
   

     window.setTimeout(()=>{
      this.setStep(1);
  }, 500)
    
    }

    componentDidMount(){
      const prevData = window.sessionStorage.getItem('shippingAddress');
      if(prevData){
        this.setState({userAddress:prevData});
       // console.log(prevData);
      }

     

    }

    setAddress = (e) => {
     
      window.sessionStorage.setItem('shippingAddress', e.target.value);

    }
    

    setStep = (num) => {
        //console.log(n);

        //console.log(this.props)
        this.props.stepChosen(num);
      
      
      
      }


    render(){
      const { visible } = this.state
        return(
          
            <Form style={{width:'40%', marginLeft:'30%'}} className="formOne">
               <div>
        
        <Divider hidden />
        <Transition visible={visible} animation='scale' duration={500}>

          <div>
          <h2>Enter Shipping Info</h2>
          <Form.Field>
            <label style={{ fontSize: "15px" }}>First Name</label>
            <input
              placeholder="First Name"
              style={{ height: "35px", fontSize: "15px" }}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: "15px" }}>Last Name</label>
            <input
              placeholder="Last Name"
              style={{ height: "35px", fontSize: "15px" }}
            />
          </Form.Field>
          <Form.Field>
            <label style={{ fontSize: "15px" }}>Address</label>
            <input
              onChange={this.setAddress}
              defaultValue={this.state.userAddress}
          
              placeholder="Address"
              style={{ height: "45px", fontSize: "15px" }}
              
            />
          </Form.Field>
          
          <Button style={{fontSize:'15px'}}
          content={visible ? 'Next' : 'Show'}
          onClick={this.toggleVisibility}
        />
          </div>
        </Transition>
      </div>

      <Step.Group ordered>
    <Step>
      <Step.Content >
      <Icon style={{fontSize:'20px'}}  name='shipping fast' />
        <Step.Description> Choose your shipping options</Step.Description>
      </Step.Content>
    </Step>

    <Step>
      <Step.Content>
      <Icon style={{fontSize:'20px'}}  name='dollar' />
        <Step.Description>Enter billing information</Step.Description>
      </Step.Content>
    </Step>

    <Step>
      <Step.Content>
      <Icon style={{fontSize:'20px'}}  name='info circle' />
        <Step.Description>Comfirm your order</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
            
         
        </Form>
        )
    }
}

export default StepFormOne;