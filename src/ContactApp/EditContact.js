import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function EditContact(props) {
  const { id, name, email, category, subcategory } =
    props.location.state.contact;
  const [formValues, setFormValues] = useState({
    id: id,
    name: name,
    email: email,
    category: category,
    subcategory: subcategory,
  });
  const [focused, setFocused] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (
      (formErrors.name === undefined && formErrors.email === undefined) ||
      (formValues.name !== "" && formValues.email !== "")
    ) {
      const newContact = {
        id: formValues.id,
        name: formValues.name.toLowerCase(),
        email: formValues.email.toLowerCase(),
        category: formValues.category.toLowerCase(),
        subcategory: formValues.subcategory.toLowerCase(),
      };
      props.updateContactHandler(newContact);
      props.history.push("/ContactList");
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "enter your name";
    }
    if (!values.email) {
      errors.email = "enter your email";
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value.toLowerCase(),
    });
  };

  const handleFocus = (e) => {
    setFocused(true);
    setFormErrors(validate(formValues));
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value.toUpperCase(),
    });
  };

  return (
    <div className="col-sm-6 col-md-6 col-lg-4 mx-auto">
      <Header title="Contact Form" />
      <h4
        style={{
          marginBottom: "30px",
          borderRadius: "4px",
          textAlign: "center",
        }}
        className="btn-info p-2"
      >
        Edit Contact
      </h4>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input
          name="name"
          onBlur={handleFocus}
          focused={focused.toString()}
          type="text"
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
          onBlur={handleFocus}
          focused={focused.toString()}
          className={formErrors.email && "error-control"}
          value={formValues.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter email"
        />
        <p className="error-style">{formErrors.email}</p>

        <h6>Category</h6>
        <select
          name="category"
          id="category"
          value={formValues.category}
          onChange={handleChange}
          style={{ height: "38px", textTransform: "uppercase" }}
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

        <h6>SubCategory</h6>
        <select
          name="subcategory"
          id="subcategory"
          value={formValues.subcategory}
          onChange={handleChange}
          style={{ height: "38px", textTransform: "uppercase" }}
        >
          <option value="" disabled style={{ textTransform: "none" }}>
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

        <button type="submit" className="edit-update-btn common-btn">
          Update
        </button>
        <Link to="/ContactList">
          <button type="button" className="edit-cancel-btn common-btn">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
}

export default EditContact;
