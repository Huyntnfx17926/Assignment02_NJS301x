import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { get, post } from "../../utils/fetch";

import Wrapper from "../../components/wrapper/Wrapper";

import "../../App.css";
import "./addRoom.css";

const AddRoom = () => {
  const [title, setTitle] = useState({ value: "", isValid: true });
  const [description, setDescription] = useState({ value: "", isValid: true });
  const [maxPeople, setMaxPeople] = useState({ value: 2, isValid: true });
  const [price, setPrice] = useState({ value: 100, isValid: true });
  const [hotel, setHotel] = useState({ value: "", isValid: true });
  const [rooms, setRooms] = useState({
    value: "",
    isValid: true,
  });

  const [hotelList, setHotelList] = useState([]);
  const [isWarnOn, setWarnOn] = useState(true);

  const navigate = useNavigate();
  const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const space = /\s/g;

  const inputInfo = {
    title: { label: "Title", name: "title", type: "text" },
    description: { label: "Description", name: "description", type: "text" },
    price: { label: "Price", name: "price", type: "number" },
    maxPeople: { label: "Max People", name: "maxPeople", type: "number" },
    rooms: { label: "Rooms", name: "rooms" },
    hotel: { label: "Hotel", name: "hotel" },
  };

  useEffect(() => {
    const getHotelList = async () => {
      const response = await get("/get-all-hotel");
      // console.log("response.data:", response.data);
      if (response) {
        setHotelList(response.data);
      }
    };
    getHotelList();
  }, []);

  // ===================================================================
  // HANDLER - START
  // ===================================================================

  const handleEvent = (event) => {
    // console.log("event:", event.target);
    const target = event.target;
    if (target.type === "checkbox") {
      return {
        _name: target.name,
        value: target.value,
        type: target.type,
        checked: target.checked,
      };
    } else {
      return {
        _name: target.name,
        value: target.value,
        type: target.type,
      };
    }
  };

  const handleChange = (event) => {
    const { _name, value, checked, type } = handleEvent(event);
    // console.log(_name, value);
    switch (_name) {
      case "maxPeople":
        setMaxPeople({ ...maxPeople, value: value });
        break;
      case "rooms":
        setRooms({ ...rooms, value: value });
        break;
      case "hotel":
        setHotel({ ...hotel, value: value });
        break;
      case "price":
        setPrice({ ...price, value: value });
        break;
      case "title":
        setTitle({ ...title, value: value });
        break;
      case "description":
        setDescription({ ...description, value: value });
        break;
    }
  };

  const stringValidation = (value) => {
    // console.log(value);
    let _value;

    if (value === "") {
      return false;
    }
    if (space.test(value) || specialChar.test(value)) {
      if (space.test(value)) {
        _value = value.split(" ");
      }
      if (specialChar.test(value)) {
        _value = value.split(specialChar);
      }

      _value = _value
        .map((item) => Number.isNaN(parseInt(item)))
        .find((item) => item == true);

      if (_value) {
        return false;
      } else {
        return true;
      }
    } else {
      if (parseInt(value)) {
        return true;
      } else {
        return false;
      }
    }
  };
  const blankValidation = (value) => {
    return value !== "" ? true : false;
  };
  const numberValidation = (value) => {
    return value == 0 ? false : true;
  };

  const inputValidation = () => {
    let isAllValid = true;
    let isValid;

    isValid = blankValidation(title.value);
    setTitle({ ...title, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = blankValidation(description.value);
    setDescription({ ...description, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = numberValidation(price.value);
    setPrice({ ...price, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = numberValidation(maxPeople.value);
    setMaxPeople({ ...maxPeople, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = blankValidation(hotel.value);
    setHotel({ ...hotel, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = stringValidation(rooms.value);
    setRooms({ ...rooms, isValid: isValid });
    isAllValid = isAllValid && isValid;

    setWarnOn(isAllValid);
    return isAllValid;
  };

  const handleAddRoom = async (event) => {
    event.preventDefault();
    const valid = inputValidation();

    const _input = {
      rooms: rooms.value.split(" ").map((item) => parseInt(item)),
      hotel: hotel.value,
      maxPeople: maxPeople.value,
      price: price.value,
      title: title.value,
      description: description.value,
    };
    // console.log(_input);
    if (valid) {
      await post("/add-new-room", _input);
      navigate("/rooms");
    }
  };

  // ===================================================================
  // HANDLER - END
  // ===================================================================

  // ===================================================================
  // RENDER - START
  // ===================================================================

  const renderCharInput = (inputInfo, input) => {
    return (
      <div className="addHotel__form--item align-items-center">
        <span className={`${input.isValid ? `` : `warning-text`}`}>
          {inputInfo.label}:
        </span>
        <input
          className={`addHotel__form--input ${
            input.isValid ? `` : `input-warning`
          } input-underline input-outline-none`}
          type={inputInfo.type}
          name={inputInfo.name}
          value={input.value}
          onChange={(e) => handleChange(e)}
        />
      </div>
    );
  };

  const renderTextArea = (inputInfo, input) => {
    return (
      <div className="addHotel__form--item w-100 align-items-center">
        <p className={`${input.isValid ? `` : `warning-text`}`}>
          {inputInfo.label}:
        </p>
        <textarea
          className={`${
            input.isValid ? `` : `textArea-warning`
          } w-100 input-outline-none p-1`}
          name={inputInfo.name}
          value={input.value}
          onChange={(e) => handleChange(e, input)}
          rows="1"
          // cols="50"
          placeholder="give comma between room numbers"
        ></textarea>
      </div>
    );
  };

  const renderOptionInput = (inputInfo, input, optionList) => {
    // console.log(input);
    return (
      <div className="addHotel__form--item">
        <span className={`${input.isValid ? `` : `warning-text`}`}>
          {inputInfo.label}:
        </span>
        <select
          className={`addHotel__form--select ${
            input.isValid ? `` : `input-border-warning`
          } input-outline-none w-100 mt-2`}
          name={inputInfo.name}
          // defaultValue={}
          onChange={(e) => handleChange(e)}
        >
          <option key={0} value="">
            Select
          </option>
          {optionList.map((option, i) => (
            <option key={++i} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  // ===================================================================
  // RENDER - END
  // ===================================================================

  return (
    <Wrapper>
      <section className="addHotel__container py-3">
        <section className="addHotel__wrapper">
          <div className="table_wrapper shadow p-4 bg-white rounded">
            <h3>Add New Room</h3>
            <div className="addHotel__form--wrapper">
              <form action="">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    {/* title input */}
                    {renderCharInput(inputInfo.title, title)}
                    {/* description input */}
                    {renderCharInput(inputInfo.description, description)}
                  </div>
                  <div className="col-md-12 col-lg-6">
                    {renderCharInput(inputInfo.price, price)}
                    {renderCharInput(inputInfo.maxPeople, maxPeople)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    {renderTextArea(inputInfo.rooms, rooms)}
                  </div>
                  <div className="col-md-12 col-lg-6">
                    {renderOptionInput(inputInfo.hotel, hotel, hotelList)}
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mt-2 d-flex justify-content-center">
                    <button
                      onClick={handleAddRoom}
                      className={`addHotel__button button ${
                        isWarnOn ? `button--green` : `button--red`
                      } `}
                    >
                      {isWarnOn ? "Send" : "Some Input Invalid"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </Wrapper>
  );
};

export default AddRoom;
