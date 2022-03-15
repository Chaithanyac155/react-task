import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

function ContactCard(props) {
  const { id, name, email, category, subcategory } = props.contact;
  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <tr>
        <td>
          <h6 className="m-0">
            <Link
              to={{
                pathname: `/contact/${id}`,
                state: { contact: props.contact },
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              {name}
            </Link>
          </h6>
        </td>
        <td>
          <h6>
            <Link
              to={{
                pathname: `/contact/${id}`,
                state: { contact: props.contact },
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              {email}
            </Link>
          </h6>
        </td>
        <td>
          <h6>
            <Link
              to={{
                pathname: `/contact/${id}`,
                state: { contact: props.contact },
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              {category}
            </Link>
          </h6>
        </td>
        <td>
          <h6>
            <Link
              to={{
                pathname: `/contact/${id}`,
                state: { contact: props.contact },
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              {subcategory}
            </Link>
          </h6>
        </td>

        <td>
          <Link
            to={{ pathname: `/editcontact`, state: { contact: props.contact } }}
            className="update-btn"
          >
            Update
          </Link>
        </td>
        <td>
          <button onClick={toggle} className="delete-btn common-btn">
            Delete
          </button>
        </td>
      </tr>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Alert!</ModalHeader>
        <ModalBody>Are you sure do you want delete it?</ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            style={{ boxShadow: "none" }}
            onClick={() => props.clickHander(id)}
          >
            Yes
          </Button>
          <Button
            color="secondary"
            style={{ boxShadow: "none" }}
            onClick={toggle}
          >
            No
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default ContactCard;
