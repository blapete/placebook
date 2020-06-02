import React, { useContext, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Card from "../Card/Card";
import "./Carousel.css";
import { useStoreContext } from "../../utils/BusinessContext";
import API from "../../utils/API";


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function MyCarousel() {

  const [state, dispatch] = useStoreContext();

  const getBusiness = () => {
    API.getBusiness()
      .then(results => {
        dispatch({
          type: "UPDATE_BIZ",
          business: results
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getBusiness();
  }, []);




  return (
    <div id="carousel" responsive={responsive}>
      {/* {state.business.map(biz => {
        <Card key={biz._id}>
          name={biz.name}
          category={biz.category}
          address={biz.address}
          city={biz.city}
          phone={biz.phone}
        </Card>
      })} */}
      <Card />
    </div>
  );
}

export default MyCarousel;
