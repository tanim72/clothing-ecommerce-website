import { React, useState } from "react";
import { Box, Card, CardContent, Divider, Button } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function ClothingCard(props) {
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
  const { openErr } = stateErr;

  const handleClick = (newState) => () => {
    if (size != null) {
      setState({ open: true, ...newState });
      addToCart();
    } else {
      console.log("size is null");
      setStateErr({ openErr: true, ...newState });
    }
  };

  const addToCart = () => {
    let url = "http://localhost:9000/product/add-to-cart/" + props.userUID;
    axios.put(url, {
      name: props.title,
      price: props.price,
      size: size,
      quantity: 1,
      url: props.thumbnail,
    });
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
            {props.isClothing ? (
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
            ) : (
              <ToggleButtonGroup
                value={size}
                color="primary"
                exclusive
                onChange={(event, alignment) => setSize(alignment)}
              >
                <ToggleButton value="6">6</ToggleButton>
                <ToggleButton value="7">7</ToggleButton>
                <ToggleButton value="8">8</ToggleButton>
                <ToggleButton value="9">9</ToggleButton>
                <ToggleButton value="10">10</ToggleButton>
                <ToggleButton value="11">11</ToggleButton>
                <ToggleButton value="12">12</ToggleButton>
              </ToggleButtonGroup>
            )}
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={handleClick({
                vertical: "top",
                horizontal: "center",
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
