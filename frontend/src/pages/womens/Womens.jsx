import { React, useState, useEffect } from "react";
import axios from "axios";
import ClothingCard from "../ClothingCard";

export default function Mens() {
  const [womensDresses, setWomensDresses] = useState([]);
  const [womensShoes, setWomensShoes] = useState([]);
  const [womensWatches, setWomensWatches] = useState([]);

  useEffect(() => {
    getWomensDresses();
    getWomensShoes();
    getWomensWatches();
    // eslint-disable-next-line
  }, []);

  const getWomensDresses = () => {
    axios.get("http://localhost:9000/product/womens/dresses").then((result) => {
      setWomensDresses(result.data.products);
    });
  };

  const getWomensShoes = () => {
    axios.get("http://localhost:9000/product/womens/shoes").then((result) => {
      setWomensShoes(result.data.products);
    });
  };

  const getWomensWatches = () => {
    axios.get("http://localhost:9000/product/womens/watches").then((result) => {
      setWomensWatches(result.data.products);
    });
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h1>Womens</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {womensDresses &&
            womensDresses.map((obj, key) => (
              <ClothingCard
                title={obj.title}
                brand={obj.brand}
                price={obj.price}
                rating={obj.rating}
                thumbnail={obj.thumbnail}
                isClothing={true}
              />
            ))}
          {womensShoes &&
            womensShoes.map((obj, key) => (
              <ClothingCard
                title={obj.title}
                brand={obj.brand}
                price={obj.price}
                rating={obj.rating}
                thumbnail={obj.thumbnail}
                isClothing={false}
              />
            ))}
          {womensWatches &&
            womensWatches.map((obj, key) => (
              <ClothingCard
                title={obj.title}
                brand={obj.brand}
                price={obj.price}
                rating={obj.rating}
                thumbnail={obj.thumbnail}
                isClothing={true}
              />
            ))}
        </div>
      </div>
    </>
  );
}
