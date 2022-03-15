import React, { useRef } from "react";
import ContactCard from "./ContactCard";
import { useHistory } from "react-router-dom";
import Header from "./Header";
import Pagination from "./Pagination";

export default function ContactList(props) {
  const inputE1 = useRef("");
  const history = useHistory();

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const getSearchTerm = () => {
    props.searchKeyword(inputE1.current.value);
  };

  const getUniqueValues = (data, type) => {
    let unique = data.map((item) => item[type]);
    return ["all", ...new Set(unique)];
  };

  const categories = getUniqueValues(props.filterContacts, "category");
  const subcategories = getUniqueValues(props.filterContacts, "subcategory");

  const handlebtn = (e) => {
    e.preventDefault();
    props.setContactAll("all");
    history.push("/");
    props.setSearchTerm("");
    props.setSubcat("all");
  };

  return (
    <main>
      <Header title="Contact List" />

      <div className="page">
        <div className="section-center products">
          <div className="left-section">
            <button
              type="button"
              className="addContact-btn common-btn"
              onClick={(e) => handlebtn(e)}
            >
              AddContact
            </button>
            <div className="form-group">
              <h6>Category</h6>
              <select
                name="category"
                value={props.contactAll}
                onChange={props.updatefilterContact}
                className="category"
              >
                {categories.map((c, index) => {
                  return (
                    <option key={index} value={c}>
                      {c}
                    </option>
                  );
                })}
              </select>
            </div>
            {props.contactAll !== "all" && (
              <div className="form-group">
                <h6>Sub Category</h6>
                <select
                  name="subcategory"
                  value={props.subcat}
                  onChange={props.updatesubcategory}
                  className="category"
                >
                  {subcategories.map((c, index) => {
                    return (
                      <option key={index} value={c}>
                        {c}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}
          </div>
          <div>
            <input
              ref={inputE1}
              type="text"
              value={props.searchTerm}
              onChange={getSearchTerm}
              placeholder="Search Contacts..."
            />
            <p className="contacts-length">
              {props.contacts.length} contact
              {props.contacts.length > 1 && <span>s </span>} available
            </p>
            {props.contacts.length > 0 ? (
              <table className="table table-bordered table-striped text-center table-responsive-sm">
                <thead>
                  <tr>
                    <th scope="col">Full Name</th>
                    <th scope="col">Personal Email</th>
                    <th scope="col">Category</th>
                    <th scope="col">SubCategory</th>
                    <th scope="col">Update</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {props.contacts
                    .slice(props.indexOfFirstContact, props.indexOfLastContact)
                    .map((contact) => {
                      return (
                        <ContactCard
                          contact={contact}
                          clickHander={deleteContactHandler}
                          key={contact.id}
                        />
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <p style={{ textAlign: "center" }}>No Contact Found</p>
            )}
            <Pagination
              setCurrentPage={props.setCurrentPage}
              currentPage={props.currentPage}
              contactsPerPage={props.contactsPerPage}
              totalContacts={props.totalContacts}
              paginate={props.paginate}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
