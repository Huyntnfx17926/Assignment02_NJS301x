const initialState = {
  types: [
    { name: "Hotel", value: "hotel" },
    { name: "Apartment", value: "Apartment" },
    { name: "Resort", value: "resort" },
    { name: "Villa", value: "villa" },
    { name: "Cabin", value: "cabin" },
  ],
  cities: [
    { name: "Hồ Chí Minh", value: "Ho Chi Minh" },
    { name: "Hà Nội", value: "Ha Noi" },
    { name: "Đà Nẵng", value: "Da Nang" },
  ],
  hotels: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case "RESET":
    //   state.types = [
    //     { name: "Hotel", value: "hotel" },
    //     { name: "Apartment", value: "Apartment" },
    //     { name: "Resort", value: "resort" },
    //     { name: "Villa", value: "villa" },
    //     { name: "Cabin", value: "cabin" },
    //   ];
    //   state.cities = [
    //     { name: "Hồ Chí Minh", value: "Ho Chi Minh" },
    //     { name: "Hà Nội", value: "Ha Noi" },
    //     { name: "Đà Nẵng", value: "Da Nang" },
    //   ];

    //   return { ...state };
    default:
      return state;
  }
};

export default reducer;
