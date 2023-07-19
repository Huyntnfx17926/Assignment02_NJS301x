import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { get, post } from "../../utils/fetch";

import Wrapper from "../../components/wrapper/Wrapper";

import "../../App.css";
import "./addHotel.css";

const AddHotel = () => {
  // const [input, setInput] = useState({
  //   name: "",
  //   type: "hotel",
  //   address: "",
  //   city: "Ho Chi Minh",
  //   distance: 50,
  //   title: "",
  //   description: "",
  //   price: 100,
  //   image: "",
  //   featured: "yes",
  //   room: [],
  // });

  // const [inputValid, setInputValid] = useState({
  //   name: true,
  //   address: true,
  //   distance: true,
  //   title: true,
  //   room: true,
  //   description: true,
  //   price: true,
  //   image: true,
  // });
  const [name, setName] = useState({ value: "", isValid: true });
  const [type, setType] = useState({ value: "hotel", isValid: true });
  const [address, setAddress] = useState({ value: "", isValid: true });
  const [city, setCity] = useState({ value: "Ho Chi Minh", isValid: true });
  const [distance, setDistance] = useState({ value: 50, isValid: true });
  const [title, setTitle] = useState({ value: "", isValid: true });
  const [description, setDescription] = useState({ value: "", isValid: true });
  const [price, setPrice] = useState({ value: 100, isValid: true });
  const [featured, setFeatured] = useState({ value: true, isValid: true });
  const [image, setImage] = useState({ value: "", isValid: true });
  const [selectedRoom, setSelectedRoom] = useState({
    value: [],
    isValid: true,
  });

  const [isWarnOn, setWarnOn] = useState(true);
  const [roomList, setRoomList] = useState([]);

  const navigate = useNavigate();

  const hotelTypeList = useSelector((state) => state.hotel.types);
  const cityList = useSelector((state) => state.hotel.cities);
  const featureOptions = [
    { name: "Yes", value: true },
    { name: "No", value: false },
  ];
  const inputInfo = {
    name: { label: "Name", name: "name", type: "text" },
    address: { label: "Address", name: "address", type: "text" },
    title: { label: "Title", name: "title", type: "text" },
    description: { label: "Description", name: "description", type: "text" },
    city: { label: "City", name: "city" },
    type: { label: "Type", name: "type" },
    featured: { label: "Feature", name: "feature" },
    image: { label: "Image Link", name: "image" },
    room: { label: "Room List", name: "room" },
    price: { label: "Price", name: "price", type: "number" },
    distance: {
      label: "Distance from city center",
      name: "distance",
      type: "number",
    },
  };

  useEffect(() => {
    const getAllRoom = async () => {
      const response = await get("/get-all-room");
      // console.log("response.data:", response.data);
      if (response) {
        setRoomList(response.data);
      }
    };
    getAllRoom();
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

  const handleChange = (event, input) => {
    const { _name, value, checked, type } = handleEvent(event);
    // console.log(_name, value);
    switch (_name) {
      case "name":
        setName({ ...name, value: value });
        break;
      case "type":
        setType({ ...type, value: value });
        break;
      case "address":
        setAddress({ ...address, value: value });
        break;
      case "city":
        setCity({ ...city, value: value });
        break;
      case "featured":
        setFeatured({ ...featured, value: value });
        break;
      case "distance":
        setDistance({ ...distance, value: value });
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
      case "image":
        setImage({ ...image, value: value });
        break;
      case "room":
        const _selectedRoom = [...selectedRoom.value];
        const selectedCheckBox = checked
          ? [..._selectedRoom, value]
          : _selectedRoom.filter((item) => item != value);
        setSelectedRoom({
          ...selectedRoom,
          value: selectedCheckBox,
        });
        break;
    }
  };

  const arrayValidation = (value) => {
    return value.length == 0 ? false : true;
  };

  const textValidation = (value) => {
    return value == "" ? false : true;
  };
  const numberValidation = (value) => {
    return value == 0 ? false : true;
  };

  const inputValidation = () => {
    let isAllValid = true;
    let isValid;

    isValid = textValidation(name.value);
    setName({ ...name, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = textValidation(address.value);

    setAddress({ ...address, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = numberValidation(distance.value);
    setDistance({ ...distance, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = textValidation(title.value);
    setTitle({ ...title, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = textValidation(description.value);
    setDescription({ ...description, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = numberValidation(price.value);
    setPrice({ ...price, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = textValidation(image.value);
    setImage({ ...image, isValid: isValid });
    isAllValid = isAllValid && isValid;

    isValid = arrayValidation(selectedRoom.value);
    setSelectedRoom({ ...selectedRoom, isValid: isValid });
    isAllValid = isAllValid && isValid;

    // console.log("valid isAllValid:", isAllValid);
    return isAllValid;
  };

  const handleAddHotel = async (event) => {
    event.preventDefault();
    const valid = inputValidation();
    setWarnOn(valid);

    const _input = {
      name: name.value,
      address: address.value,
      type: type.value,
      city: city.value,
      featured: featured.value,
      distance: distance.value,
      price: price.value,
      title: title.value,
      description: description.value,
      image: image.value,
      selectedRoom: selectedRoom.value,
    };

    if (valid) {
      await post("/add-new-hotel", _input);
      navigate("/hotels");
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
          } w-100 input-outline-none`}
          name={inputInfo.name}
          value={input.value}
          onChange={(e) => handleChange(e, input)}
          rows="4"
          // cols="50"
        ></textarea>
      </div>
    );
  };

  const renderOptionInput = (inputInfo, optionList) => {
    return (
      <div className="addHotel__form--item">
        <span>{inputInfo.label}:</span>
        <select
          selected={optionList[0].value}
          className={`addHotel__form--select input-outline-none w-100 mt-2`}
          name={inputInfo.name}
          onChange={(e) => handleChange(e)}
        >
          {optionList.map((option, i) => (
            <option key={i} value={option.value}>
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
            <h3>Add New Hotel</h3>
            <div className="addHotel__form--wrapper">
              <form action="">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    {/* name input */}
                    {renderCharInput(inputInfo.name, name)}
                    {/* address input */}
                    {renderCharInput(inputInfo.address, address)}
                    <div className="row">
                      {/* type input */}
                      <div className="col-md-12 col-lg-4 py-md-2">
                        {renderOptionInput(inputInfo.type, hotelTypeList)}
                      </div>
                      {/* city input */}
                      <div className="col-md-12 col-lg-4 py-md-2">
                        {renderOptionInput(inputInfo.city, cityList)}
                      </div>
                      {/* featured input */}
                      <div className="col-md-12 col-lg-4 py-md-2">
                        {renderOptionInput(inputInfo.featured, featureOptions)}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 col-lg-6">
                        {/* distance input */}
                        {renderCharInput(inputInfo.distance, distance)}
                      </div>
                      {/* price input */}
                      <div className="col-md-12 col-lg-6">
                        {renderCharInput(inputInfo.price, price)}
                      </div>
                    </div>
                    {/* title input */}
                    {renderCharInput(inputInfo.title, title)}
                    {/* description input */}
                    {renderCharInput(inputInfo.description, description)}
                    {/* image input */}
                    {renderTextArea(inputInfo.image, image)}
                  </div>

                  <div className="col-md-12 col-lg-6">
                    {/* room input */}
                    <span
                      className={`${
                        selectedRoom.isValid ? `` : `warning-text`
                      }`}
                    >
                      {inputInfo.room.label}
                    </span>
                    <Table striped>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th className="text-center">Max people</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {roomList.map((room, i) => (
                          <tr key={i}>
                            <td>{++i}</td>
                            <td>{room.title}</td>
                            <td>{room.price}</td>
                            <td className="text-center">{room.maxPeople}</td>
                            <td>
                              <input
                                type="checkbox"
                                name="room"
                                value={room._id}
                                onChange={(e) => handleChange(e)}
                              ></input>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12 mt-2 d-flex justify-content-center">
                    <button
                      onClick={handleAddHotel}
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

export default AddHotel;
