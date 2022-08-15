import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/auth";
import Navbar from "../../components/layouts/defaultNavbar";
import Footer from "../../components/layouts/Footer";

class Signout extends Component {
  componentDidMount() {
    this.props.signoutUser();
    setTimeout(() => {
      this.props.history.push("/");
    }, 1000);
  }

  render() {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">
          <div className="mt-48 text-center">Sorry to see you go...</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
