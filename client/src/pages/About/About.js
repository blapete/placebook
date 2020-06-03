import React, { useEffect } from "react";
import "./About.css";
import { Jumbotron } from "reactstrap";
import Navbar from "../../components/Navbar/Navbar";
import { useUserContext } from "../../utils/UserContext";
import API from "../../utils/API";

const About = () => {
  const [userState, userDispatch] = useUserContext();
  useEffect(() => {
    API.checkUser()
      .then((userResult) => {
        console.log(userResult);
        userDispatch({
          type: "ADD_USER",
          username: userResult.data.user.username,
          email: userResult.data.user.email,
          reservations: userResult.data.user.reservations,
          _id: userResult.data.user._id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const navBar = () => {
    if (userState.username === "") {
      console.log("it is an empty string");
      return <Navbar />;
    } else {
      console.log("there is a user logged in");
      return <Navbar user="user" />;
    }
  };

  return (
    <div>
      {navBar()}
      <div id="about">
        <Jumbotron>
          <h1 className="display-3">We're Placebook.</h1>
          <p className="lead">How can Placebook benefit you?</p>
          <hr className="my-2" />
          <h6>Perfect for businesses</h6>
          <hr className="my-2" />
          <p>
            Placebook is an innovative app designed to help your business thrive
            during COVID-19 and onwards. Not all types of businesses are
            equipped with reservation systems--that's where Placebook comes in.
            This app allows your business to accept customer reservations and
            keep track of these reservations via designated time slots and
            capacities.
          </p>
          <hr className="my-2" />
          <h6>A simple way to reserve</h6>
          <hr className="my-2" />
          <p>
            Skip the 6-feet-apart lines and reserve your timeslots for any
            outing in advance. Placebook allows users to easily search through
            available businesses, create an account, and make, update, or cancel
            upcoming reservations. Don't see a business you think should be
            here? Have questions or comments? Email us at{" "}
            <a href="#">placebookservices@placebook.com</a>.
          </p>
        </Jumbotron>
      </div>
    </div>
  );
};

export default About;
