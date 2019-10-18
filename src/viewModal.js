import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { showAlert } from "./alerts";




const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "70%"
  }
};

Modal.setAppElement("#root");

export class ViewModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      name: "",
      category: [],
      selectedOption: null
      
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }


 
  onFormSubmit = async event => {
    event.preventDefault();

   

    try {

      
      axios.defaults.withCredentials = true;
      const res = await axios({
        method: "POST",
        url: "http://localhost:9000/api/v1/products/category",

        data: {
          name: this.state.name,
          mainCategory: this.state.selectedOption
        },
        withCredentials: true
      });

      if (res.data.status === "success") {
        showAlert("success", "Category added successfully!");

        this.setState({ name: "" });
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  async componentDidMount() {
    try {
      // axios.defaults.withCredentials = true;
      const res = await axios({
        method: "GET",
        url: "http://localhost:9000/api/v1/products/mainCategory",

        withCredentials: true
      });

      this.setState({ category: res.data.results.mainCategories });

      if (res.data.status === "success") {
        // showAlert('success','Category added successfully!');
      }
    } catch (err) {
      console.log(err.response);

      // showAlert('error',err.response.data.message);
    }
  }

  showOption = (e) => {

    this.setState({selectedOption:e.target.value});
      //alert(e.target.value);
  }

  render() {
    return (
      <div>
        <div
          onClick={this.openModal}
          
       
        >
          {this.props.classType}
        </div>

       
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            
            <button
              style={{ position: "absolute", right: "10px", bottom: "10px" }}
              className="btn"
              onClick={this.closeModal}
            >
              close
            </button>
          </Modal>
     
      </div>
    );
  }
}

export default ViewModal;
