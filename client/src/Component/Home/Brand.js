import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

function Brand({ settings }) {
  const data = [
    { image: "aqua-one.png" },
    { image: "Eheim.png" },
    { image: "Fluval.png" },
    { image: "Kirby_Pet.png" },
    { image: "nutrafin.png" },
    { image: "Reptile_One.png" },
    { image: "seachem.png" },
    { image: "Sera.png" },
    { image: "Sicce.png" },
    { image: "Tropical.png" },
  ];
  return (
    <Slider {...settings}>
    {data.map(item =>(
       <div>
        <Link to="/" className="">
          <img width="60%" alt="" src={"/images/brand/"+ item.image}/>
        </Link>
      </div> 
    ))}
    </Slider>
  );
}

export default Brand;
