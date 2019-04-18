import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Container
} from "reactstrap";
import Radio from "@material-ui/core/Radio";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";

class AddAnEv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      loc: "Readify",
      dateAndTime: "",
      loading: false,
    };
    
  }
  handleLocationChange = event => {
    this.setState({ loc: event.target.value });
    
  };
  handleNameChange = event => {
    this.setState({ name: event.target.value });
    console.log(event.target.value);
  }
  handleDateChange = event => {
    this.setState({ dateAndTime: event.target.value });
  }

  handleSubmit = (event) => {
    console.log('works...');
    console.log(this.state);
    this.setState({loading: true });
  };
  render() {
    return (
      <div>
        <Container>
          <Form className="add-event">
            <FormGroup>
              <TextField
                id="outlined-required"
                label="Name?"
                defaultValue=""
                margin="normal"
                variant="outlined"
                onChange={this.handleNameChange}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                id="datetime-local"
                label="Date and Time"
                type="datetime-local"
                defaultValue="2019-05-24T09:00"
                onChange={this.handleDateChange}
              />
            </FormGroup>
            <FormGroup className="radio-button-left">
              <Radio
                checked={this.state.loc === "Readify"}
                onChange={this.handleLocationChange}
                value='Readify'
                name="radio-button"
                aria-label="Readify"
              />
              <FormLabel component="legend">Readify</FormLabel>
            </FormGroup>
            <FormGroup className="radio-button-right">
              <Radio
                checked={this.state.loc === "Elsewhere"}
                onChange={this.handleLocationChange}
                value='Elsewhere'
                name="radio-button"
                aria-label="Elsewhere"
              />
              <FormLabel component="legend">Elsewhere</FormLabel>
            </FormGroup>
            <Divider />
            <FormGroup className="submit-button">
              <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                Add
                <Icon>
                  send
                  { this.state.loading && <div class="spinner-grow text-warning" role="status"></div> }
                </Icon>
              </Button>
            </FormGroup>
          </Form>
        </Container>
        
      </div>
    );
  }
}

export default AddAnEv;
