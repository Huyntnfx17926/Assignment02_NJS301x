import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { get, post } from "../../utils/fetch";

import Wrapper from "../../components/wrapper/Wrapper";
import NotificationBox from "../../components/notificationBox/NotificationBox";

import "../../App.css";
import "./hotelList.css";

const HotelList = () => {
  const [hotelList, setHotelList] = useState([]);
  const [deleteHotel, setDeleteHotel] = useState({});
  const [isNotiBoxOpen, setNotiBoxOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getAllHotel = async () => {
      const allHotel = await get("/get-all-hotel");
      // console.log(allHotel.data);
      setHotelList(allHotel.data);
    };
    getAllHotel();
  }, [hotelList]);

  const handleOpenModal = () => {
    setNotiBoxOpen(!isNotiBoxOpen);
  };

  const handleDeleteHotel = async (item) => {
    // await post("/delete-hotel", { id: item._id });
    setDeleteHotel(item);
    setNotiBoxOpen(true);
  };

  const renderHotelItem = (item, index) => {
    return (
      <tr key={index}>
        <td>{++index}</td>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.type}</td>
        <td>{item.title}</td>
        <td>{item.city}</td>
        <td>
          <button
            onClick={() => handleDeleteHotel(item)}
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
      <section className="hotelList__container py-3">
        <section className="hotelList__wrapper">
          <div className="table_wrapper position-relative shadow p-4 bg-white rounded">
            <div className="d-flex justify-content-between">
              <h3>Hotel List</h3>
              <button
                onClick={() => navigate("/add-hotel")}
                className="button--add button button--green"
              >
                Add new hotel
              </button>
            </div>
            <Table striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Title</th>
                  <th>City</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {hotelList.length > 0 ? (
                  hotelList.map((hotel, i) => renderHotelItem(hotel, i))
                ) : (
                  <tr>
                    <td colSpan={7}>No hotel found</td>
                  </tr>
                )}
              </tbody>
            </Table>
            {isNotiBoxOpen ? (
              <NotificationBox
                hotel={deleteHotel}
                isOpen={isNotiBoxOpen}
                handleOpenModal={handleOpenModal}
                page={"hotelList"}
                api={"/delete-hotel"}
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

export default HotelList;
