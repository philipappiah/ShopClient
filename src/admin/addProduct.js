import React from "react";
import axios from "axios";
import { showAlert } from "../alerts";

import "react-images-uploader/styles.css";
import "react-images-uploader/font.css";
import CategoryModal from "./modal";


export class AddProduct extends React.Component {
  state = {
    type: "",
    description: "",
    coverImage: null,
    selectedOption1: "",
    selectedOption2: "",
    files: [],
    category: [],
    images: [],
    subCategory: [],
    showCategory: false
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
        console.log(res);
        // showAlert('success','Category added successfully!');
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
      window.setTimeout(() => {
        window.location.assign("/signIn");
      }, 1500);
    }
  }

  fileSelectedHandler = event => {
    console.log(event.target.files.length);
    let images = [];
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
      images = images.filter(image =>
        image.name.match(/\.(jpg|jpeg|png|gif)$/)
      );
      let message = `${images.length} valid image(s) selected`;
      this.setState({ images });

      //  console.log('hy')
      // this.setState({ files: [...this.state.files, ...e.target.files] })
      // console.log(this.state.files)
    }
  };

  setCoverImage = (e) => {
      this.setState({coverImage:e.target.files[0]})

  }

  onFormSubmit = async event => {
    event.preventDefault();

    try {
      var x = document.getElementById("subCategory").value;
      let imageFiles = [];
      var f = document.getElementById("photo").files[0];

      const form = new FormData();
      form.append("name", document.getElementById("name").value);
      form.append("countryOfManufacture", "Korea");
      form.append("brand", "Samsung");
      form.append("mainCategory", this.state.selectedOption1);
      form.append("category", x);

      form.append("description", document.getElementById("description").value);
      form.append("imageCover", document.getElementById("coverImage").files[0]);
      for (let i = 0; i < this.state.images.length; i++) {
        var x = document.getElementById("photo").files[i];
        form.append("images", x);
      }

      //form.append("images", document.getElementById('photo').files);
      form.append("price", document.getElementById("price").value);

      axios.defaults.withCredentials = true;
      const res = await axios({
        method: "POST",
        url: "http://localhost:9000/api/v1/shopProducts",

        data: form,
        withCredentials: true
      });

      console.log(res);

      if (res.data.status === "success") {
        showAlert("success", " Product added successfully");
      }
    } catch (err) {
      showAlert("error", err.response.data.message);
    }
  };

  showSubCatOption = async e => {
    this.setState({ selectedOption2: e.target.value });
    alert(e.target.value);
  };

  showOption = async e => {
    this.setState({ selectedOption1: e.target.value });

    const mainCat = e.target.value;
    try {
      // axios.defaults.withCredentials = true;
      const res = await axios({
        method: "GET",
        url: `http://localhost:9000/api/v1/products/category/${mainCat}`,

        withCredentials: true
      });

      if (res.data.status === "success") {
        this.setState({ subCategory: res.data.results.categories });

        // showAlert('success',' Registration successful. Please check your email to verify your account!');
      }
    } catch (err) {
      console.log(err.response.data.message);
      showAlert("error", err.response.data.message);
    }
  };

  render() {
    return (
      <React.Fragment>
        <main className="main">
          <CategoryModal
            classType="fas fa-plus-circle"
            catName="Add Category"
          />
          <br></br>
          <CategoryModal
            classType="fas fa-minus-circle"
            catName="Remove Category"
          />

          <div className="login-form">
            <h2 className="heading-secondary ma-bt-lg">Add Product</h2>
            <form onSubmit={this.onFormSubmit} className="form">
              <div className="form__group">
                <label className="form__label" htmlFor="fullname">
                  Product Type
                </label>
                <input
                  className="form__input"
                  id="name"
                  type="text"
                  placeholder="Microwave Oven"
                  required="required"
                  onChange={e => this.setState({ type: e.target.value })}
                />
              </div>
              <div className="form__group">
                <label className="form__label" htmlFor="category">
                  Main Category
                </label>

                <select
                  className="form__input"
                  id="category"
                  onChange={e => this.showOption(e)}
                >
                  {this.state.category ? (
                    this.state.category.map(x => (
                      <option key={x._id} value={x._id}>
                        {x.name}
                      </option>
                    ))
                  ) : (
                    <option key="value" value="--select--">
                      --select--
                    </option>
                  )}
                </select>
              </div>

              <div className="form__group">
                <label className="form__label" htmlFor="email">
                  Sub category
                </label>

                <select
                  className="form__input"
                  id="subCategory"
                  onChange={e => this.showSubCatOption(e)}
                >
                  {this.state.subCategory ? (
                    this.state.subCategory.map(x => (
                      <option key={x._id} value={x._id}>
                        {x.name}
                      </option>
                    ))
                  ) : (
                    <option key="value" value="--select--">
                      --select--
                    </option>
                  )}
                </select>
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="password">
                  Description
                </label>
                <input
                  className="form__input"
                  id="description"
                  type="text"
                  placeholder="description"
                  required="required"
                  min="8"
                  onChange={e => this.setState({ description: e.target.value })}
                />
              </div>
              <div className="form__group ma-bt-md">
                <label className="form__label" htmlFor="passwordConfirm">
                  Price
                </label>
                <input
                  className="form__input"
                  id="price"
                  type="Number"
                  placeholder="price"
                  required="required"
                  onChange={e => this.setState({ price: e.target.value })}
                />
              </div>

              <label htmlFor="photo">Add Related Images</label>

              <div className="form__group ma-bt-md">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  
                  onChange={this.fileSelectedHandler}
                  accept="image/*"
                  style={{ cursor: "pointer" }}
                  multiple
                />
                <div className="form__group ma-bt-md">
                  {this.state.images ? (
                    this.state.images.map((x, i) => (
                      <img
                        src={URL.createObjectURL(x)}
                        style={{
                          height: "100px",
                          width: "130px",
                          borderRadius: "5px",
                          margin: "3px"
                        }}
                        alt="image"
                        key={i}
                      />
                    ))
                  ) : (
                    <div>No images</div>
                  )}
                </div>
              </div>

              <label htmlFor="photo">Add A Cover Image</label>

              <div className="form__group ma-bt-md">
                <input
                  type="file"
                  id="coverImage"
                  name="coverImage"
                  accept="image/*"
                  onChange={this.setCoverImage}
                  style={{ cursor: "pointer" }}
                />
              </div>
              {this.state.coverImage ? 
              (<img src={URL.createObjectURL(this.state.coverImage)} 
              style={{
                height: "100px",
                width: "130px",
                borderRadius: "5px",
                margin: "3px"
              }}
              alt="image"
              />):
              <div><p>No cover image selected</p></div>
              
            }
              {/* <ImagesUploader
             
                onChange={this.fileSelectedHandler}
                optimisticPreviews
                onLoadEnd={(err) => {
                    if (err) {
                        console.error(err);
                    }
                }}
                label="Upload multiple images"
                /> */}

              <div className="form__group">
                <button className="btn btn--green">Add</button>
              </div>
            </form>
          </div>
        </main>
      </React.Fragment>
    );
  }
}
