import React from "react";
import { Link } from "react-router-dom";

function ContactDetail(props) {
  const { name, email, category, subcategory } = props.location.state.contact;
  return (
    <div className="card shadow-lg mx-auto my-3" style={{ width: "20rem" }}>
      <img
        className="card-img-top"
        src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
        alt="logo"
      />
      <div className="card-body mx-auto">
        <p className="card-title">
          <b>Name: </b>
          {name}
        </p>
        <p className="card-text">
          <b>Email: </b>
          {email}
        </p>
        <p>
          <b>Company Name: </b>
          {category}
        </p>
        <p>
          <b>Designation: </b>
          {subcategory}
        </p>
        <Link to="/ContactList">
          <button className="common-btn" style={{ backgroundColor: "#007bff" }}>
            Go to ContactList
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ContactDetail;
