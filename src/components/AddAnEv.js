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
import { connect } from "react-redux";
import { addEvent } from "../store/actions/eventActions";
import SelectInput from "@material-ui/core/Select/SelectInput";
import { delay } from "q";

class AddAnEv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "Readify",
      date: "",
      time: "",
      dd: "",
      mm: "",
      yyyy: "",
      loading: false,
    };
  }
  handleLocationChange = event => {
    this.setState({ location: event.target.value });
  };
  handleNameChange = event => {
    this.setState({ name: event.target.value });
  }
  handleDateChange = event => {
    //caprute date and time
    var dateAndTime = event.target.value;
    //split date and time
    dateAndTime = dateAndTime.split('T');
    //split date 
    var date = dateAndTime[0].split('-');
    this.setState({ date: dateAndTime[0] });
    this.setState({ time: dateAndTime[1] });
    this.setState({ dd: date[2] });
    this.setState({ mm: date[1] });
    this.setState({ yyyy: date[0] });
  }

  handleSubmit = (event) => {
    this.setState({loading: true });
    this.props.addEvent(this.state);
    //window.location.reload();
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
                checked={this.state.location === "Readify"}
                onChange={this.handleLocationChange}
                value='Readify'
                name="radio-button"
                aria-label="Readify"
              />
              <FormLabel component="legend">Readify</FormLabel>
            </FormGroup>
            <FormGroup className="radio-button-right">
              <Radio
                checked={this.state.location === "Elsewhere"}
                onChange={this.handleLocationChange}
                value='Elsewhere'
                name="radio-button"
                aria-label="Elsewhere"
              />
              <FormLabel component="legend">Elsewhere</FormLabel>
            </FormGroup>
            <Divider />
            <FormGroup className="submit-button">
              { !this.state.loading && <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                Add
                <Icon>
                  send
                  { this.state.loading && <div class="spinner-grow text-warning" role="status"></div> }
                </Icon>
              </Button>
              }
              { (this.state.loading === true) && <Button variant="contained" color="primary">
                <Icon> 
                  <div className="spinner-grow text-warning" role="status"></div> 
                </Icon>
              </Button>
              }
            </FormGroup>
          </Form>
        </Container>
        
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addEvent: (event) => dispatch(addEvent(event))
  }
}

export default connect(null, mapDispatchToProps)(AddAnEv);
