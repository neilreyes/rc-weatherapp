import React, { Component } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = process.env.REACT_APP_ACCUWEATHER_KEY;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      searchKeyword: "",
      selectedLocation: null
    };
  }

  fetchLocation = async (searchKeyword) => {
    try {
      const location = await axios.get(
        `https://dataservice.accuweather.com/locations/v1/search?`,
        {
          params: {
            q: searchKeyword,
            apikey: API_KEY
          }
        }
      );

      const forecasts = await axios.get(
        `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${location.data[0].Key}`,
        {
          params: {
            apikey: API_KEY
          }
        }
      );

      const condition = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${location.data[0].Key}`,
        {
          params: {
            language: "en-us",
            details: false,
            apikey: API_KEY
          }
        }
      );

      const newLocation = {
        Location: location.data[0],
        DailyForecasts: forecasts.data,
        Condition: condition.data[0]
      };

      this.setState({ selectedLocation: newLocation });

      this.setState({ searchKeyword: "" });
    } catch (error) {
      console.error("Error: ", error.message);
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.fetchLocation(this.state.searchKeyword);
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1500);
  }

  handleChange(e) {
    this.setState({ searchKeyword: e.target.value });
  }

  render() {
    return (
      <Container className="my-5 app-container">
        <Row className="form-row">
          <Col className="">
            <h1 className="greetings d-none">Weather Forecasts</h1>
            <p className="greeting-subheading">
              Find other cities and check the weather
            </p>
            <Form
              onSubmit={(e) => this.handleSubmit(e)}
              className="d-flex search-form"
              disabled={this.state.isLoading ? true : false}
            >
              <Form.Control
                type="text"
                placeholder={"Type your place here..."}
                value={this.state.searchKeyword}
                onChange={(e) => this.handleChange(e)}
                disabled={this.state.isLoading ? true : false}
              />
              <Button
                onClick={(e) => this.handleSubmit(e)}
                className="search-btn"
                disabled={this.state.isLoading ? true : false}
              >
                {this.state.isLoading ? "Loading..." : "Search"}
              </Button>
            </Form>
          </Col>
        </Row>

        {!this.state.isLoading && (
          <Weather data={this.state.selectedLocation} />
        )}
      </Container>
    );
  }
}
