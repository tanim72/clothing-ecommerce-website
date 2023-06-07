import { React, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import ClothingCard from "../ClothingCard";

export default function Mens() {
  const [mensShirts, setMensShirts] = useState([]);
  const [mensWatches, setMensWatches] = useState([]);
  const [mensShoes, setMensShoes] = useState([]);
  const [userUID, setUserUID] = useState(null);

  useEffect(() => {
    getMensShirts();
    getMensWatches();
    getMensShoes();
    getUserUID();
    // eslint-disable-next-line
  }, []);

  const getUserUID = () => {
    setUserUID(Cookies.get("uid"));
  };

  const getMensShirts = () => {
    axios.get("http://localhost:9000/product/mens/shirts").then((result) => {
      setMensShirts(result.data.products);
    });
  };

  const getMensWatches = () => {
    axios.get("http://localhost:9000/product/mens/watches").then((result) => {
      setMensWatches(result.data.products);
    });
  };

  const getMensShoes = () => {
    axios.get("http://localhost:9000/product/mens/shoes").then((result) => {
      setMensShoes(result.data.products);
    });
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Mens</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {mensShirts &&
            mensShirts.map((obj, key) => (
              <ClothingCard
                title={obj.title}
                brand={obj.brand}
                price={obj.price}
                rating={obj.rating}
                thumbnail={obj.thumbnail}
                isClothing={true}
                userUID={userUID}
              />
            ))}
          {mensWatches &&
            mensWatches.map((obj, key) => (
              <ClothingCard
                title={obj.title}
                brand={obj.brand}
                price={obj.price}
                rating={obj.rating}
                thumbnail={obj.thumbnail}
                isClothing={true}
                userUID={userUID}
              />
            ))}
          {mensShoes &&
            mensShoes.map((obj, key) => (
              <ClothingCard
                title={obj.title}
                brand={obj.brand}
                price={obj.price}
                rating={obj.rating}
                thumbnail={obj.thumbnail}
                isClothing={false}
                userUID={userUID}
              />
            ))}
        </div>
      </div>
    </>
  );
}
