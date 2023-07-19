import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

import { post } from "../../utils/fetch";

import "../../App.css";
import "./notificationBox.css";

const NotificationBox = (props) => {
  const [isModalOpen, setModalOpen] = useState(props.isOpen);
  const [resText, setResText] = useState("");
  const [renderData, setData] = useState({ name: "", detail: "", id: "" });

  // console.log("props.hotel:", props.hotel);
  // console.log("isModalOpen:", isModalOpen);
  useEffect(() => {
    const setRenderData = () => {
      switch (props.page) {
        case "hotelList":
          setData({
            name: props.hotel.name,
            detail: props.hotel.type,
            id: props.hotel._id,
          });
          break;
        case "roomList":
          console.log(props.room);
          setData({
            name: props.room.title,
            detail: "room",
            id: props.room._id,
          });
          break;
      }
    };
    setRenderData();
  }, []);

  const handleDelete = async () => {
    const response = await post(props.api, { id: renderData.id });
    if (response.data !== "") {
      setResText(response.data);
    } else {
      props.handleOpenModal();
    }
  };

  return (
    <section className="modal__container">
      <section className="modal__wrapper modal">
        <Modal
          show={isModalOpen}
          onHide={() => props.handleOpenModal()}
          // backdrop="static"
          // keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="warning-text">Delete Comfirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>
              {resText === ""
                ? `Delete ${renderData.name} ${renderData.detail} ?`
                : `${resText}`}
            </h4>
          </Modal.Body>
          <Modal.Footer>
            {resText === "" ? (
              <button
                className="modal__button button button--red"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
            ) : (
              <button
                className="modal__button button button--green"
                onClick={() => props.handleOpenModal()}
              >
                Close
              </button>
            )}
          </Modal.Footer>
        </Modal>
      </section>
    </section>
  );
};

export default NotificationBox;
