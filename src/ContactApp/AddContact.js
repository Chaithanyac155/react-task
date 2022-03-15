import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function AddContact(props) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
    subcategory: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    category: "",
    subcategory: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      formErrors.name === undefined &&
      formErrors.email === undefined &&
      formErrors.password === undefined &&
      formErrors.category === undefined &&
      formErrors.subcategory === undefined
    ) {
      const newContact = {
        name: formValues.name.toLowerCase(),
        email: formValues.email.toLowerCase(),
        category: formValues.category.toLowerCase(),
        subcategory: formValues.subcategory.toLowerCase()
      };
      props.addContactHandler(newContact);
      setFormValues({
        name: "",
        email: "",
        password: "",
        category: "",
        subcategory: ""
      });
      props.history.push("/ContactList");
    }
  };

  const validate = (values) => {
    const errors = {};
    const validName = /^[a-zA-Z ]{3,20}$/;
    const validEmail = new RegExp(
      "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"
    );
    // const validPassword =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/;

    if (!values.name) {
      errors.name = "enter your name";
    } else if (!validName.test(values.name)) {
      errors.name =
        "Full name should be 3-20 characters not include any special characters or numbers";
    }
    if (!values.email) {
      errors.email = "enter your email";
    } else if (!validEmail.test(values.email)) {
      errors.email = "Invalid email";
    }
    if (!values.password) {
      errors.password = "enter your password";
    }
    // else if (!validPassword.test(values.password)) {
    //   errors.password =
    //     "password must contain atleat 8 characters that includes One Uppercase, One Lowercase, One Number, One Special Character";
    // }
    if (!values.category) {
      errors.category = "select category";
    }
    if (!values.subcategory) {
      errors.subcategory = "select category";
    }
    return errors;
  };

  const handleView = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value.toLowerCase()
    });
  };

  const handleFocus = (e) => {
    setFocused(true);
    setFormErrors(validate(formValues));
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value.toUpperCase()
    });
  };
  const handleSelectFocus = () => {
    setFocused(true);
    setFormErrors(validate(formValues));
  };
  return (
    <div className="col-sm-6 col-md-6 col-lg-4 mx-auto">
      <Header title="Contact Form" />
      <h4
        style={{
          marginBottom: "30px",
          borderRadius: "4px",
          textAlign: "center"
        }}
        className="btn-info p-2"
      >
        Add Contact
      </h4>

      <form onSubmit={handleSubmit}>
        <h6>Category</h6>
        <select
          name="category"
          id="category"
          onBlur={handleSelectFocus}
          focused={focused.toString()}
          value={formValues.category}
          onChange={handleChange}
          style={{ height: "38px", textTransform: "uppercase" }}
          className={formErrors.category && "error-control"}
        >
          <option value="" disabled style={{ textTransform: "none" }}>
            Select
          </option>
          <option value="amazon" style={{ textTransform: "none" }}>
            amazon
          </option>
          <option value="gmail" style={{ textTransform: "none" }}>
            gmail
          </option>
          <option value="twitter" style={{ textTransform: "none" }}>
            twitter
          </option>
          <option value="netflix" style={{ textTransform: "none" }}>
            netflix
          </option>
          <option value="flipkart" style={{ textTransform: "none" }}>
            flipkart
          </option>
          <option value="myntra" style={{ textTransform: "none" }}>
            myntra
          </option>
          <option value="linkedIn" style={{ textTransform: "none" }}>
            linkedIn
          </option>
          <option value="paytm" style={{ textTransform: "none" }}>
            paytm
          </option>
          <option value="google" style={{ textTransform: "none" }}>
            google
          </option>
          <option value="facebook" style={{ textTransform: "none" }}>
            facebook
          </option>
        </select>
        <p className="error-style">{formErrors.category}</p>

        <h6>SubCategory</h6>
        <select
          name="subcategory"
          id="subcategory"
          onBlur={handleSelectFocus}
          focused={focused.toString()}
          value={formValues.subcategory}
          onChange={handleChange}
          style={{ height: "38px", textTransform: "uppercase" }}
          className={formErrors.subcategory && "error-control"}
        >
          <option value="" disabled>
            Select
          </option>
          <option value="developer" style={{ textTransform: "none" }}>
            developer
          </option>
          <option value="tester" style={{ textTransform: "none" }}>
            tester
          </option>
          <option value="designer" style={{ textTransform: "none" }}>
            designer
          </option>
          <option value="associate" style={{ textTransform: "none" }}>
            associate
          </option>
          <option value="programmer" style={{ textTransform: "none" }}>
            programmer
          </option>
        </select>
        <p className="error-style">{formErrors.subcategory}</p>

        <label htmlFor="name">Full Name</label>
        <input
          name="name"
          onBlur={handleFocus}
          focused={focused.toString()}
          type="text"
          autoComplete="off"
          className={formErrors.name && "error-control"}
          value={formValues.name}
          onChange={handleChange}
          id="name"
          placeholder="Enter full name"
        />
        <p className="error-style">{formErrors.name}</p>

        <label htmlFor="email">Email address</label>
        <input
          type="text"
          name="email"
          autoComplete="off"
          onBlur={handleFocus}
          focused={focused.toString()}
          className={formErrors.email && "error-control"}
          value={formValues.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter email"
        />
        <p className="error-style">{formErrors.email}</p>

        <label htmlFor="password">Password</label>
        <input
          name="password"
          onBlur={handleFocus}
          focused={focused.toString()}
          className={formErrors.password && "error-control"}
          type={showPassword ? "text" : "password"}
          value={formValues.password}
          onChange={handleChange}
          id="password"
          placeholder="Password"
        />
        <span
          className={formErrors.password ? "eye" : "icon-eye"}
          onClick={handleView}
        >
          {showPassword ? (
            <i className="fa fa-eye"></i>
          ) : (
            <i className="fa fa-eye-slash"></i>
          )}
        </span>
        <p className="error-style">{formErrors.password}</p>

        <button type="submit" className="add-btn common-btn">
          Add
        </button>
        <Link to="/ContactList">
          <button type="button" className="view-contactlist-btn common-btn">
            View ContactList
          </button>
        </Link>
      </form>
    </div>
  );
}

export default AddContact;
