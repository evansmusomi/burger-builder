import React, { Component } from "react";

import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import Input from "../../../components/UI/Input/Input";
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
        <Input
          inputtype="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input
          inputtype="input"
          type="email"
          name="email"
          placeholder="Your Email"
        />
        <Input
          inputtype="input"
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <Input
          inputtype="input"
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
