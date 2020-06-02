import React, { createContext, useReducer, useContext } from "react";

const BizContext = createContext();
const { Provider } = BizContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_BIZ":
      return {
        ...state,
        businessId: action.businessId,
        name: action.name,
        address: action.address,
        phone: action.phone,
        ownerId: action.ownerId,
        reservations: [action.reservations],
        times: {
          open: action.open,
          close: action.close,
          timeslot_length: action.timeslot_length,
          capacity: action.capacity,
        },
      };
    default:
      return state;
  }
};

const BizProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    businessId: "",
    name: "",
    address: "",
    phone: "",
    ownerId: "",
    reservations: [],
    times: {
      open: 0,
      close: 0,
      timeslot_length: 0,
      capacity: 0,
    },
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useBizContext = () => {
  return useContext(BizContext);
};

export { BizProvider, useBizContext };
