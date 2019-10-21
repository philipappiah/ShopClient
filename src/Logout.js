import axios from 'axios';
import {showAlert} from "./alerts";
export const Logout = async () =>{
    try {
        // axios.defaults.withCredentials = true;
        const res = await axios({
          method: "GET",
          url: "http://localhost:9000/api/v1/users/logout",
  
         
          withCredentials: true
        });
        
  
        if (res.data.status === "success") {
         
          showAlert('success','Logging you out... Please wait');
          console.log(res.data);
          window.setTimeout(()=>{
            window.location.assign('/');
        }, 1500)
        }
        window.sessionStorage.setItem('shippingAddress', '');
      } catch (err) {
        
         showAlert('error','Error Logging you out... Please try again');
      }
}

export default Logout;