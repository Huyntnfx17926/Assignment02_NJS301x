import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { get } from "../../utils/fetch";

import Wrapper from "../../components/wrapper/Wrapper";

import "../../App.css";
import "./transactionList.css";

const renderTransItem = (item, index) => {
  const dateEnd = new Date(item.dateEnd);
  const dateStart = new Date(item.dateStart);
  const statusClass =
    item.status === "Booked"
      ? "booked__status"
      : item.status === "Checkin"
      ? "checkin__status"
      : "checkout__status";
  return (
    <tr key={index}>
      <td>{++index}</td>
      <td>{item._id}</td>
      <td>{item.user.username}</td>
      <td>{item.hotelName}</td>
      <td>
        {item.rooms.map((room, i) => {
          if (i > 0) {
            return "," + room.roomNumber.number;
          } else {
            return room.roomNumber.number;
          }
        })}
      </td>
      <td>
        {dateStart.getDate() +
          "/" +
          parseInt(dateStart.getMonth() + 1) +
          "/" +
          dateStart.getFullYear() +
          " - " +
          dateEnd.getDate() +
          "/" +
          parseInt(dateEnd.getMonth() + 1) +
          "/" +
          dateEnd.getFullYear()}
      </td>
      <td>${item.price}</td>
      <td>{item.payment}</td>
      <td>
        <div className={statusClass}>
          <span>{item.status}</span>
        </div>
      </td>
    </tr>
  );
};
const TransactionList = () => {
  const [allTranList, setTranList] = useState([]);

  const getRenderData = async (url, callback) => {
    const response = await get(url);
    console.log("response:", response);
    callback(response.data);
  };

  useEffect(() => {
    // const infoResponse = await get("/get-business-info");
    getRenderData("/get-all-transaction", (data) => setTranList(data));
  }, []);

  return (
    <Wrapper>
      <section className="dashboard__container py-3">
        <section className="dashboard__wrapper">
          <section className="row">
            <div className="col-12">
              <div className="table_wrapper shadow p-4 bg-white rounded">
                <h3>Transactions List</h3>
                <Table striped>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>ID</th>
                      <th>User</th>
                      <th>Hotel</th>
                      <th>Room</th>
                      <th>Date</th>
                      <th>Price</th>
                      <th>Payment method</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allTranList.length > 0 ? (
                      allTranList.map((item, i) => renderTransItem(item, i))
                    ) : (
                      <tr>
                        <td colSpan={9}>No Transaction Found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </div>
          </section>
        </section>
      </section>
    </Wrapper>
  );
};

export default TransactionList;
