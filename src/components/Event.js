import React, { Component } from "react";
import ReactDOM from "react-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import { Alert, Button } from "reactstrap";
import { connect } from "react-redux";
import { deleteEvent } from "../store/actions/eventActions";
import { editEvent } from "../store/actions/eventActions";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const locations = ["Readify", "Elsewhere"];

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      event: {
        id: null,
        name: null,
        date: null,
        time: null,
        location: null
      }
    };
  }
  handleClickOpen = () => {
    const event = this.props.event;
    this.setState({
      open: true,
      event: {
        id: event.id,
        name: event.name,
        date: event.date,
        time: event.time,
        location: event.location
      }
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  handleDelete = id => {
    this.setState({ open: false });
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure you want to delete this event?",
      buttons: [
        {
          label: "Proceed",
          onClick: () => this.props.deleteEvent(id)
        },
        {
          label: "Cancel",
          onClick: () => null
        }
      ]
    });
  };
  handleNameChange = name => event => {
    var name = String(event.target.value);
    this.setState({
      event: {
        ...this.state.event,
        name: name
      }
    }, function () {
      this.processEditRequest();
    });
  };
  handleDateChange = date => event => {
    var date = String(event.target.value);
    this.setState({
      event: {
        ...this.state.event,
        date: date
      }
    }, function () {
      this.processEditRequest();
    });
  };
  handleTimeChange = time => event => {
    var time = String(event.target.value);
    this.setState({
      event: {
        ...this.state.event,
        time: time
      }
    }, function () {
      this.processEditRequest();
    });
  };
  handleLocationChange = location => event => {
    var location = String(event.target.value);
    this.setState({
      event: {
        ...this.state.event,
        location: location
      }
    }, function () {
      this.processEditRequest();
    });
  };
  processEditRequest = () => {
    this.props.editEvent(this.state.event);
  }
  render() {
    const { event } = this.props;
    return (
      <div className="event-detail">
        <Button
          className="material-icons event-detail"
          size="sm"
          color="black"
          onClick={this.handleClickOpen}
        >
          info
        </Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogActions>
            <Button
              className="material-icons"
              size="sm"
              onClick={() => this.handleDelete(event.id)}
            >
              delete
            </Button>
            <Button
              className="material-icons"
              size="sm"
              onClick={this.handleClose}
            >
              close
            </Button>
          </DialogActions>
          <DialogTitle>{event.name}</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                id="filled-name"
                label="Name"
                value={this.state.event.name}
                onChange={this.handleNameChange("name")}
                margin="normal"
                variant="filled"
              />
              <TextField
                disabled
                id="filled-date"
                label="Date"
                value={this.state.event.date}
                onChange={this.handleDateChange("date")}
                margin="normal"
                variant="filled"
              />
              <TextField
                id="filled-time"
                label="Time"
                value={this.state.event.time}
                onChange={this.handleTimeChange("time")}
                margin="normal"
                variant="filled"
              />
              <TextField
                id="filled-select-location"
                select
                label="Select"
                value={this.state.event.location}
                onChange={this.handleLocationChange("location")}
                SelectProps={{
                  MenuProps: {
                    className: "classes.menu"
                  }
                }}
                helperText="Location of the Event"
                margin="normal"
                variant="filled"
              >
                {locations.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteEvent: id => dispatch(deleteEvent(id)),
    editEvent: event => dispatch(editEvent(event))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Event);
