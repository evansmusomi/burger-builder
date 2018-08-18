import React, { Component } from "react";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "Musomi",
    email: "test@example.com",
    address: {
      street: "TRM Drive",
      postalCode: "00100"
    },
    loading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.name,
        email: this.state.email,
        address: {
          street: this.state.address.street,
          postalCode: this.state.address.postalCode
        }
      },
      deliveryMethod: "fastest"
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          placeholder="Your Email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          placeholder="Postal Address"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
