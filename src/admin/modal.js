import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { showAlert } from "../alerts";
import Select from 'react-select';
import { async } from "q";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

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

export class CategoryModal extends React.Component {
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
        <i
          onClick={this.openModal}
          style={{ fontSize: "30px", cursor: "pointer" }}
          className={this.props.classType}
        >
          {this.props.catName}
        </i>

        {this.props.catName === "Add Category" ? (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="login-form">
              <h2 className="heading-secondary ma-bt-lg">Add Category</h2>
              <form onSubmit={this.onFormSubmit} className="form">
                <div className="form__group">
                  <label className="form__label" htmlFor="fullname">
                    Name
                  </label>
                  <input
                    className="form__input"
                    id="name"
                    type="text"
                    placeholder="Categories"
                    value={this.state.name}
                    required="required"
                    onChange={e => this.setState({ name: e.target.value })}
                  />

                  <div className="form__group">
                    <label className="form__label" htmlFor="email">
                      Category
                    </label>

                    

                    <select className="form__input" id="category" onChange={e => this.showOption(e)}>
                      <option selected> 
                            Select category 
                         </option>
                      {this.state.category ? (
                        this.state.category.map(x => (
                            
                          <option key={x._id}  value={x._id}>
                            {x.name}
                          </option>
                        ))
                      ) : (
                        <option key="value" value="--select--">
                          --Select--
                        </option>
                      )}
                    </select>
                  </div>
                </div>

                <div className="form__group">
                  <button className="btn btn--green">Add</button>
                </div>
              </form>
            </div>

            <button
              style={{ position: "absolute", right: "10px", bottom: "10px" }}
              className="btn"
              onClick={this.closeModal}
            >
              close
            </button>
          </Modal>
        ) : (
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="login-form">
              <h2 className="heading-secondary ma-bt-lg">Remove Category</h2>
              <form className="form">
                <div className="form__group">
                  <label className="form__label" htmlFor="fullname">
                    Name
                  </label>
                  <input
                    className="form__input"
                    id="name"
                    type="text"
                    placeholder="Categories"
                    value={this.state.name}
                    required="required"
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </div>

                <div className="form__group">
                  <button className="btn btn--green">Delete</button>
                </div>
              </form>
            </div>

            <button
              style={{ position: "absolute", right: "10px", bottom: "10px" }}
              className="btn"
              onClick={this.closeModal}
            >
              Close
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

export default CategoryModal;
