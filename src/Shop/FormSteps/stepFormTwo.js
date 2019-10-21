import React from 'react';
import { getCartItemsList, fetchUser, addToCart } from "../../Actions";
import { connect } from "react-redux";

import {
    Dimmer,
    Loader,
    Tab,
    Checkbox,
    Form,
    Input,
    TextArea,
    Step,
    Button,
    Select,
    Divider,
    Icon,
    Accordion,
 
    Image,
    Transition
  } from "semantic-ui-react";



export class StepFormTwo extends React.Component {
    state = {
        step:0,
        visible: true
    }
    
    componentDidMount(){
      const prevData = window.sessionStorage.getItem('shippingAddress');
      if(prevData){
        console.log(prevData);
      }

    }

    toggleVisibility = () =>{
      window.sessionStorage.setItem('shippingOption', 'pick-up point');
        this.setState((prevState) => ({ visible: !prevState.visible }));
    
         window.setTimeout(()=>{
          this.setStep(2);
      }, 500)
        
        }

       
        toggleVisibilityPrev = () =>{
          this.setState((prevState) => ({ visible: !prevState.visible }));
      
           window.setTimeout(()=>{
            this.setStep(0);
        }, 500)
          
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
       <Form.Group grouped style={{fontSize:'20px'}}>
      <label>Delivery method</label>
      <Form.Field
        label='Home or Office Deliver'
        control='input'
        type='radio'
        name='Home or Office Delivery'
      />
      <Form.Field
        label='at any of our Pickup Stations'
        control='input'
        type='radio'
        name='At any of our Pickup Stations'
      />
      
    </Form.Group>
      

      
        <Form.Group grouped style={{fontSize:'20px'}}>
      

       
          <Form.Field>
          <label style={{ fontSize: "15px" }}>Subtotal</label>
            
            <input
              placeholder='0'
              value={`GHS ${this.props.totalPrice}`}
              readOnly
              style={{ height: "35px", fontSize: "15px" }}
            />
          </Form.Field>
          <Form.Field>
          <label style={{ fontSize: "15px" }}>Shiping cost</label>
            <input
              placeholder='0'
              value='GHS 85'
              readOnly
              style={{ height: "35px", fontSize: "15px" }}
            />
          </Form.Field>
          <Form.Field>
          <label style={{ fontSize: "15px" }}>Total</label>
            
            <input
              placeholder="0"
              value={`GHS ${this.props.totalPrice + 85}`}
              style={{ height: "35px", fontSize: "15px" }}
            />
          </Form.Field>
    </Form.Group>
      
       <Button style={{fontSize:'15px'}}
       content={visible ? 'Prev' : 'Show'}
       onClick={this.toggleVisibilityPrev}
     />
       <Button style={{fontSize:'15px'}}
       content={visible ? 'Next' : 'Show'}
       onClick={this.toggleVisibility}
     />
    
       </div>
     </Transition>
   </div>
   <Step.Group ordered>
    <Step completed>
      <Step.Content>
      <Icon style={{fontSize:'20px'}}  name='shipping fast' />
   
        <Step.Description>Choose your shipping options</Step.Description>
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

const mapStateToProps = state => {
  return { cartList: state.cartList, users: state.users, carts: state.carts };
};

export default connect(
  mapStateToProps,
  { getCartItemsList, fetchUser, addToCart }
)(StepFormTwo);
