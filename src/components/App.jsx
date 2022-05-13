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
    this.fetchLocation(this.state.searchKeyword);
  }

  handleChange(e) {
    this.setState({ searchKeyword: e.target.value });
  }

  componentDidCatch() {
    this.fetchLocation("singapore");
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
            >
              <Form.Control
                type="text"
                placeholder={"Search Your Place"}
                value={this.state.searchKeyword}
                onChange={(e) => this.handleChange(e)}
              />
              <Button
                onClick={(e) => this.handleSubmit(e)}
                className="search-btn d-none"
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>

        <Weather data={this.state.selectedLocation} />
      </Container>
    );
  }
}
