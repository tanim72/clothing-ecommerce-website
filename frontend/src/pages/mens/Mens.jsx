import { React, useState, useEffect } from "react";
import { Box, Card, CardContent, Divider, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function Mens() {
  const [mensShirts, setMensShirts] = useState([]);

  useEffect(() => {
    getMensShirts();
    // eslint-disable-next-line
  }, []);

  const getMensShirts = () => {
    axios.get("http://localhost:9000/product/mens/shirts").then((result) => {
      setMensShirts(result.data.products);
    });
  };

  return (
    <>
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
            <ProductCard
              title={obj.title}
              brand={obj.brand}
              price={obj.price}
              rating={obj.rating}
              thumbnail={obj.thumbnail}
            />
          ))}
      </div>
    </>
  );
}

function ProductCard(props) {
  const [size, setSize] = useState(null);

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [stateErr, setStateErr] = useState({
    openErr: false,
    vertical: "top",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = state;
  const { verticalErr, horizontalErr, openErr } = stateErr;

  const handleClick = (newState) => () => {
    if (size != null) {
      setState({ open: true, ...newState });
    } else {
      setStateErr({ openErr: true, ...newState });
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
    setStateErr({ ...stateErr, openErr: false });
  };

  return (
    <>
      <Card
        variant="outlined"
        style={{
          margin: "10px",
          width: "430px",
          height: "550px",
        }}
      >
        <CardContent>
          <Typography variant="h4">{props.title}</Typography>
          <Box marginLeft={"-5%"} marginBottom={"1.2%"}>
            <Divider width={"105%"} />
          </Box>
          <Typography variant="h5">{props.brand}</Typography>
          <Typography variant="h5">${props.price}</Typography>
          <Typography variant="h5">{props.rating}/5</Typography>
          <img
            alt="Product Thumbnail"
            src={props.thumbnail}
            width="200px"
            height="200px"
          />
          <Box>
            <ToggleButtonGroup
              value={size}
              color="primary"
              exclusive
              onChange={(event, alignment) => setSize(alignment)}
            >
              <ToggleButton value="S">S</ToggleButton>
              <ToggleButton value="M">M</ToggleButton>
              <ToggleButton value="L">L</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={handleClick({
                vertical: "top",
                horizontal: "right",
              })}
            >
              Add to cart
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3300}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="success">Added to cart!</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openErr}
        autoHideDuration={3300}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert severity="error">
          Please select a size before adding to cart.
        </Alert>
      </Snackbar>
    </>
  );
}
