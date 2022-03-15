import React, { useState, useEffect } from "react";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import NotFound from "./NotFound";
import api from "./ApiSource";
import "./Page.css";
import EditContact from "./EditContact";

function MainPage() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [contactAll, setContactAll] = useState("all");
  const [filterContacts, setFilterContacts] = useState([]);
  const [subcat, setSubcat] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [contactsPerPage] = useState(4);

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addContactHandler = async (contact) => {
    const request = {
      id: Math.random(),
      ...contact
    };
    const response = await api.post("/contacts", request);

    setFilterContacts([response.data, ...contacts]);
    setContacts([response.data, ...contacts]);
  };

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
    setFilterContacts(
      filterContacts.filter((contact) => {
        return contact.id !== id;
      })
    );
    setSearchResult(
      searchResult.filter((contact) => {
        return contact.id !== id;
      })
    );
    setSearchTerm("");
    setContactAll("all");
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    // setContactAll("all");
    const { id } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
    setFilterContacts(
      filterContacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
    setSearchResult(
      searchResult.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });

      setSearchResult(newContactList);
    } else {
      setSearchResult(contacts);
    }
  };

  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) {
        setContacts(allContacts);
        setFilterContacts(allContacts);
      }
    };
    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const updatefilterContact = (e) => {
    setContactAll(e.target.value);
    setSearchTerm("");
    setSubcat("all");
  };

  const updatesubcategory = (e) => {
    setSubcat(e.target.value);
  };

  useEffect(() => {
    let subcontacts = [...filterContacts];
    if (contactAll !== "all") {
      subcontacts = subcontacts.filter(
        (contact) => contact.category === contactAll
      );
    }

    if (subcat !== "all") {
      subcontacts = subcontacts.filter(
        (contact) => contact.subcategory === subcat
      );
    }

    setContacts(subcontacts);
  }, [contactAll, subcat, filterContacts]);

  return (
    <div className="container">
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <AddContact
                contacts={contacts}
                {...props}
                addContactHandler={addContactHandler}
              />
            )}
          ></Route>
          <Route
            exact
            path="/ContactList"
            render={(props) => (
              <ContactList
                {...props}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                indexOfFirstContact={indexOfFirstContact}
                indexOfLastContact={indexOfLastContact}
                contactsPerPage={contactsPerPage}
                totalContacts={contacts.length}
                paginate={paginate}
                filterContacts={filterContacts}
                setContactAll={setContactAll}
                contactAll={contactAll}
                updatefilterContact={updatefilterContact}
                contacts={searchTerm.length < 1 ? contacts : searchResult}
                getContactId={removeContactHandler}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                searchKeyword={searchHandler}
                subcat={subcat}
                setSubcat={setSubcat}
                updatesubcategory={updatesubcategory}
              />
            )}
          ></Route>
          <Route
            exact
            path="/editcontact"
            render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          ></Route>
          <Route exact path="/contact/:id" component={ContactDetail}></Route>
          <Route path="*" component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default MainPage;
