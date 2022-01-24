import React, { useState } from "react";
import { List, ListItem, ListItemText, Dialog } from "@material-ui/core";

const PopupProducts = ({
  products,
  handleRemoveProduct,
  handleClose,
  handleClickOpen,
  open,
}) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <List>
        {products.map((item) => (
          <ListItem
            button
            onClick={(itemId) => handleRemoveProduct(item.id)}
            key={item.id + "text"}
          >
            <ListItemText>
              <div style={{ width: "15%", display: "contents" }}>
                <div style={{ margin: "5px" }}>
                  <button
                    onClick={(itemId) => {
                      handleRemoveProduct(item.id);
                      handleClose();
                    }}
                  >
                    X
                  </button>
                </div>
                <div style={{ marginLeft: "100px" }}>
                  <span style={{ display: "block" }}>{item.title}</span>
                  <span>${item.price}</span>
                </div>
                <div style={{ marginLeft: "50px" }}>Qty {item.quantity}</div>
              </div>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default PopupProducts;
