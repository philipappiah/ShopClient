import React from 'react';

import {
    Dimmer,
    Loader,
    Tab,
    Checkbox,
    Form,
    Step,
    Input,
    TextArea,
    Button,
    Select,
    Divider,
   Icon,
 
    Image,
    Transition
  } from "semantic-ui-react";

export class StepFromFour extends React.Component{

    state = {
        step:0,
        visible: true
    }
    
    toggleVisibility = () =>{
        this.setState((prevState) => ({ visible: !prevState.visible }));
    
         window.setTimeout(()=>{
          this.setStep(0);
      }, 500)
        
        }

        toggleVisibilityPrev = () =>{
          this.setState((prevState) => ({ visible: !prevState.visible }));
      
           window.setTimeout(()=>{
            this.setStep(1);
        }, 500)
          
          }

    setStep = (num) => {
        //console.log(n);

        //console.log(this.props)
        this.props.stepChosen(num);
      
      
      
      }

      onSubmit = () => {
        console.log(this.props.cartData);
        
        // try {
        //   const res = await axios({
        //     method: "POST",
        //     url: "http://localhost:9000/api/v1/user/checkOut",
    
        //     withCredentials: true
        //   });
         
         
          
         
         
        // }catch(err){
        //   console.log(err)
        // }
    
      }


    render(){
        const { visible } = this.state
        return (
            <Form style={{width:'40%', marginLeft:'30%'}} className="formOne">
            <div>
     
     <Divider hidden />
     <Transition visible={visible} animation='scale' duration={500}>

       <div>
       <h2>Confirm Your order</h2>
      
        <Form.Group grouped style={{fontSize:'20px'}}>

      <Form.Field
        label='creditCard'
        control='input'
        type='radio'
        name='Credit Card'
      />
      <Form.Field
        label='payPal'
        control='input'
        type='radio'
        name='PayPal'
      />
       <h2>Shipment details</h2>
         
          <Form.Field>
            
            <input
              value = "Delivered Between Tuesday 29 Oct and Wednesday 30 Oct"
              readOnly
              style={{ height: "35px", fontSize: "15px" }}
            />
          </Form.Field>
    </Form.Group>
       <Form.Field>
         <Checkbox
           style={{ fontSize: "15px" }}
           label="I agree to the Terms and Conditions"
         />
       </Form.Field>
       <Button style={{fontSize:'15px'}}
       content={visible ? 'Prev' : 'Show'}
       onClick={this.toggleVisibilityPrev}
     />

  
       <Button style={{fontSize:'15px'}} onClick={this.onSubmit}>
         Submit

       </Button>
    
    
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

    <Step completed>
      <Step.Content>
      <Icon style={{fontSize:'20px'}}  name='dollar' />
        <Step.Description>Enter billing information</Step.Description>
      </Step.Content>
    </Step>

    <Step>
      <Step.Content completed>
      <Icon style={{fontSize:'20px'}}  name='info circle' />
        <Step.Description>Comfirm your order</Step.Description>
      </Step.Content>
    </Step>
  </Step.Group>
         
      
     </Form>
        )
    }
}

export default StepFromFour;