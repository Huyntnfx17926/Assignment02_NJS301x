import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { get, post } from "../../utils/fetch";

import Wrapper from "../../components/wrapper/Wrapper";
import NotificationBox from "../../components/notificationBox/NotificationBox";

import "../../App.css";
import "./roomList.css";

const RoomList = () => {
  const [roomList, setRoomList] = useState([]);
  const [deleteRoom, setDeleteRoom] = useState({});
  const [isNotiBoxOpen, setNotiBoxOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllRoom = async () => {
      const allRoom = await get("/get-all-room");
      // console.log(allRoom.data);
      setRoomList(allRoom.data);
    };
    getAllRoom();
  }, [roomList]);

  const handleOpenModal = () => {
    setNotiBoxOpen(!isNotiBoxOpen);
  };

  const handleDeleteRoom = async (item) => {
    // await post("/delete-hotel", { id: item._id });
    setDeleteRoom(item);
    setNotiBoxOpen(true);
  };

  const renderHotelItem = (item, index) => {
    return (
      <tr key={index}>
        <td>{++index}</td>
        <td>{item._id}</td>
        <td>{item.title}</td>
        <td className="roomList__table--desc">{item.desc}</td>
        <td>{item.price}</td>
        <td className="text-center">{item.maxPeople}</td>
        <td>
          <button
            onClick={() => handleDeleteRoom(item)}
            className="button--delete button button--red"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  return (
    <Wrapper>
      <section className="roomList__container py-3">
        <section className="roomList__wrapper">
          <div className="table_wrapper position-relative shadow p-4 bg-white rounded">
            <div className="d-flex justify-content-between">
              <h3>Room List</h3>
              <button
                onClick={() => navigate("/add-room")}
                className="button--add button button--green"
              >
                Add new room
              </button>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Max People</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {roomList.length > 0 ? (
                  roomList.map((hotel, i) => renderHotelItem(hotel, i))
                ) : (
                  <tr>
                    <td colSpan={7}>No room found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {isNotiBoxOpen ? (
              <NotificationBox
                room={deleteRoom}
                isOpen={isNotiBoxOpen}
                handleOpenModal={handleOpenModal}
                page={"roomList"}
                api={"/delete-room"}
              />
            ) : (
              <></>
            )}
          </div>
        </section>
      </section>
    </Wrapper>
  );
};

export default RoomList;
