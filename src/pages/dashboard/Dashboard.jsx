import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

import { get } from "../../utils/fetch";

import Wrapper from "../../components/wrapper/Wrapper";

import "../../App.css";
import "./dashboard.css";

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
          dateStart.getMonth() +
          "/" +
          parseInt(dateStart.getMonth() + 1) +
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
const Dashboard = () => {
  const [lastestList, setLastestList] = useState([]);
  const [businessInfo, setBusinessInfo] = useState([]);

  const getRenderData = async (url, callback) => {
    const response = await get(url);
    console.log("response:", response);
    callback(response.data);
  };

  useEffect(() => {
    // const infoResponse = await get("/get-business-info");
    getRenderData("/get-lastest-transaction", (data) => setLastestList(data));
    getRenderData("/get-business-info", (data) => setBusinessInfo(data));
  }, []);

  return (
    <Wrapper>
      <section className="dashboard__container py-3">
        <section className="dashboard__wrapper">
          <section className="row">
            {/* USER INFO - START */}
            <div className="col-3">
              <div className="shadow p-3 mb-5 bg-white rounded position-relative">
                <span>USERS</span>
                <h1>{businessInfo.users ? businessInfo.users : 0}</h1>
                <div className="dashboard__icon icon__user">
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M272 304h-96C78.8 304 0 382.8 0 480c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32C448 382.8 369.2 304 272 304zM48.99 464C56.89 400.9 110.8 352 176 352h96c65.16 0 119.1 48.95 127 112H48.99zM224 256c70.69 0 128-57.31 128-128c0-70.69-57.31-128-128-128S96 57.31 96 128C96 198.7 153.3 256 224 256zM224 48c44.11 0 80 35.89 80 80c0 44.11-35.89 80-80 80S144 172.1 144 128C144 83.89 179.9 48 224 48z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* USER INFO - END */}
            {/* ORDERS INFO - START */}
            <div className="col-3">
              <div className="shadow p-3 mb-5 bg-white rounded position-relative">
                <span>ORDERS</span>
                <h1>{businessInfo.orders ? businessInfo.orders : 0}</h1>
                <div className="dashboard__icon icon__order">
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* ORDERS INFO - END */}
            {/* EARNING INFO - START */}
            <div className="col-3">
              <div className="shadow p-3 mb-5 bg-white rounded position-relative">
                <span>EARNING</span>
                <h1>${businessInfo.earning ? businessInfo.earning : 0}</h1>
                <div className="dashboard__icon icon__earning">
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M326.7 403.7c-22.1 8-45.9 12.3-70.7 12.3s-48.7-4.4-70.7-12.3c-.3-.1-.5-.2-.8-.3c-30-11-56.8-28.7-78.6-51.4C70 314.6 48 263.9 48 208C48 93.1 141.1 0 256 0S464 93.1 464 208c0 55.9-22 106.6-57.9 144c-1 1-2 2.1-3 3.1c-21.4 21.4-47.4 38.1-76.3 48.6zM256 91.9c-11.1 0-20.1 9-20.1 20.1v6c-5.6 1.2-10.9 2.9-15.9 5.1c-15 6.8-27.9 19.4-31.1 37.7c-1.8 10.2-.8 20 3.4 29c4.2 8.8 10.7 15 17.3 19.5c11.6 7.9 26.9 12.5 38.6 16l2.2 .7c13.9 4.2 23.4 7.4 29.3 11.7c2.5 1.8 3.4 3.2 3.8 4c.3 .8 .9 2.6 .2 6.7c-.6 3.5-2.5 6.4-8 8.8c-6.1 2.6-16 3.9-28.8 1.9c-6-1-16.7-4.6-26.2-7.9l0 0 0 0 0 0c-2.2-.7-4.3-1.5-6.4-2.1c-10.5-3.5-21.8 2.2-25.3 12.7s2.2 21.8 12.7 25.3c1.2 .4 2.7 .9 4.4 1.5c7.9 2.7 20.3 6.9 29.8 9.1V304c0 11.1 9 20.1 20.1 20.1s20.1-9 20.1-20.1v-5.5c5.4-1 10.5-2.5 15.4-4.6c15.7-6.7 28.4-19.7 31.6-38.7c1.8-10.4 1-20.3-3-29.4c-3.9-9-10.2-15.6-16.9-20.5c-12.2-8.8-28.3-13.7-40.4-17.4l-.8-.2c-14.2-4.3-23.8-7.3-29.9-11.4c-2.6-1.8-3.4-3-3.6-3.5c-.2-.3-.7-1.6-.1-5c.3-1.9 1.9-5.2 8.2-8.1c6.4-2.9 16.4-4.5 28.6-2.6c4.3 .7 17.9 3.3 21.7 4.3c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-4.4-1.2-14.4-3.2-21-4.4V112c0-11.1-9-20.1-20.1-20.1zM48 352H64c19.5 25.9 44 47.7 72.2 64H64v32H256 448V416H375.8c28.2-16.3 52.8-38.1 72.2-64h16c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V400c0-26.5 21.5-48 48-48z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* EARNING INFO - END */}
            {/* BALANCE INFO - START */}
            <div className="col-3">
              <div className="shadow p-3 mb-5 bg-white rounded position-relative">
                <span>BALANCE</span>
                <h1>${businessInfo.balance ? businessInfo.balance : 0}</h1>
                <div className="dashboard__icon icon__balance">
                  <svg
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 336c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
                  </svg>
                </div>
              </div>
            </div>
            {/* BALANCE INFO - END */}
          </section>
          <section className="row">
            <div className="col-12">
              <div className="table_wrapper shadow p-4 bg-white rounded">
                <h3>Lastest Transactions</h3>
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
                    {lastestList.length > 0 ? (
                      lastestList.map((item, i) => renderTransItem(item, i))
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

export default Dashboard;
