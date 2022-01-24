import React, { useState, useEffect } from "react";
import { List, ListItem, IconButton } from "@material-ui/core";
import { fetchProducts } from "../Api/Request";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PopupProducts from "./PopupProducts";

const Cart = (props) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState(0);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  useEffect(() => {
    fetchProducts().then((res) => {
      let productsTemp = [...res.products];
      let totalTemp = 0;
      let itemsTemp = 0;
      productsTemp &&
        productsTemp.map((item) => {
          item.quantity = 1;
          totalTemp = Number(totalTemp + item.quantity * item.price);
          itemsTemp = Number(itemsTemp + item.quantity);
          return item;
        });
      setTotal(totalTemp);
      setItems(itemsTemp);
      setProducts(productsTemp);
    });
  }, []);

  const handleIncreaseProductItem = (itemId) => {
    let productsTemp = [...products];
    let totalTemp = 0;
    let itemsTemp = 0;
    productsTemp &&
      productsTemp.map((item) => {
        if (item.id === itemId) {
          item.quantity = Number(item.quantity + 1);
        }
        totalTemp = Number(totalTemp + item.quantity * item.price);
        itemsTemp = Number(itemsTemp + item.quantity);
        return item;
      });
    setTotal(totalTemp);
    setItems(itemsTemp);
    setProducts(productsTemp);
  };
  const handleDecreaseProductItem = (itemId) => {
    let productsTemp = [...products];
    let totalTemp = 0;
    let itemsTemp = 0;
    productsTemp &&
      productsTemp.map((item) => {
        if (item.id === itemId) {
          item.quantity = Number(item.quantity > 0 ? item.quantity - 1 : 0);
        }
        totalTemp = Number(totalTemp + item.quantity * item.price);
        itemsTemp = Number(itemsTemp + item.quantity);
        return item;
      });
    setTotal(totalTemp);
    setItems(itemsTemp);
    setProducts(productsTemp);
  };

  const handleDirectInput = (e, itemId) => {
    let productsTemp = [...products];
    let totalTemp = 0;
    let itemsTemp = 0;
    productsTemp &&
      productsTemp.map((item) => {
        if (item.id === itemId) {
          item.quantity = Number(e.target.value);
        }
        totalTemp = Number(totalTemp + item.quantity * item.price);
        itemsTemp = Number(itemsTemp + item.quantity);
        return item;
      });
    setTotal(totalTemp);
    setItems(itemsTemp);
    setProducts(productsTemp);
  };

  const handleRemoveProduct = (itemId) => {
    let productsTemp = [...products];
    productsTemp && productsTemp.filter((item) => item.id !== itemId);

    setProducts(productsTemp);
  };

  return (
    <>
      <List>
        <div style={{ textAlign: "end", marginRight: "10px" }}>
          <span style={{ display: "block" }}>${total}</span>
          <span>{items} Items</span>
          <div
            style={{
              marginTop: "-52px",
              marginLeft: "858px",
              textAlign: "right",
            }}
          >
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClickOpen}
            >
              <MoreVertIcon />
            </IconButton>
            <PopupProducts
              products={products}
              handleRemoveProduct={handleRemoveProduct}
              handleClose={handleClose}
              handleClickOpen={handleClickOpen}
              open={open}
            />
          </div>
        </div>
      </List>
      <List>
        {products &&
          products.length > 0 &&
          products.map((item) => {
            return (
              <ListItem
                style={{
                  border: "1px solid gray",
                }}
                key={item.id}
              >
                <div style={{ width: "70%" }}>
                  <div>
                    <span style={{ display: "block" }}>{item.title}</span>
                    <span>{item.description}</span>
                  </div>
                </div>
                <div>
                  <button
                    style={{ margin: "5px" }}
                    onClick={(itemId) => handleDecreaseProductItem(item.id)}
                  >
                    -
                  </button>
                  <input
                    type="text"
                    style={{ width: "15%", textAlign: "center" }}
                    value={item.quantity}
                    onChange={(e, itemId) => handleDirectInput(e, item.id)}
                  />
                  <button
                    style={{ margin: "5px" }}
                    onClick={(itemId) => handleIncreaseProductItem(item.id)}
                  >
                    +
                  </button>
                </div>
                <div>${item.price}</div>
              </ListItem>
            );
          })}
      </List>
    </>
  );
};

export default Cart;
