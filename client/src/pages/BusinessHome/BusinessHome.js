import React from "react";
import Calendar from "../../components/Calendar/Calendar";
import "bulma/css/bulma.css";
import Jumbo from "../../components/Jumbotron/JumbotronBusinessHome/JumbotronBusinessHome";
import Navbar from "../../components/Navbar/Navbar";
import { useBizContext } from "../../utils/BusinessContext";
import { useUserContext } from "../../utils/UserContext";
import API from "../../utils/API";

const BusinessHome = () => {
  const [bizState, bizDispatch] = useBizContext();
  const [userState, userDispatch] = useUserContext();
  const [date, setDate] = React.useState(new Date());
  // const [userAuth, setuserAuth] = useState("");

  const checkLocal = () => {
    let storageStatus = JSON.parse(localStorage.getItem("currentUser"));
    if (storageStatus) {
      if (storageStatus.email !== null && userState.username === "") {
        userDispatch({
          type: "ADD_USER",
          username: storageStatus.username,
          email: storageStatus.email,
          reservations: storageStatus.reservations,
          _id: storageStatus._id,
        });
      }
    }
  };
  checkLocal();

  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(user._id);
    API.findOneBiz(user._id, {
      date: date.toLocaleDateString()
    })
      .then((bizResult) => {
        console.log(bizResult)
        bizDispatch({
          type: "UPDATE_BIZ",
          businessId: bizResult.data.business._id,
          name: bizResult.data.business.name,
          address: bizResult.data.business.address,
          phone: bizResult.data.business.phone,
          reservations: bizResult.data.todaysReservations,
          times: {
            open: bizResult.data.business.times.open,
            close: bizResult.data.business.times.close,
            timeslot_length: bizResult.data.business.times.timeslot_length,
            capacity: bizResult.data.business.times.capacity,
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  // const navBar = () => {
  //   console.log("navbar function");
  //   if (userAuth !== "") {
  //     return <Navbar status="user" />;
  //   } else {
  //     return <Navbar />;
  //   }
  // };
  const renderAppts = () => {
    let something = bizState.reservations.map((e) => {
      return (
        <div className="row">
          <button
            className="button"
            style={{ display: "block", margin: "10px", width: "auto" }}
          >
            Day: {e.date} Time: {e.time} Place: {e.businessName}
          </button>
          {/* <button
            businessId={e.businessId}
            date={e.date}
            time={e.time}
            resId={e._id}
            className="button"
            style={{ display: "block", margin: "10px", width: "auto" }}
            // onClick={deleteInfo}
          >
            Remove
          </button> */}
        </div>
      );
    });
    return something;
  };

  return (
    <div>
      <Navbar status={userState.username} />
      <div className="container">
        <Jumbo />
        <div className="section">
          <div className="columns">
            <div className="column">
              <Calendar />
            </div>
            <div className="column">
              <h6>Date:</h6>
              <p>Your appointments:</p>
            </div>

          </div>

        </div>
        {renderAppts()}
      </div>
    </div>
  );
};

export default BusinessHome;
