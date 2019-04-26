import React, { Component } from "react";
import "./App.css";
import { Container, Table } from "reactstrap";
import { Alert, Button } from "reactstrap";
import Navigation from "./components/Navigation";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: null,
      month: null,
      first: null,
      thisMonday: null,
      nextMonday: null,
      readifyMonday: [],
      readifyTuesday: [],
      readifyWednesday: [],
      readifyThursday: [],
      readifyFriday: [],
      readifySaturday: [],
      readifySunday: [],
      elsewhereMonday: [],
      elsewhereTuesday: [],
      elsewhereWednesday: [],
      elsewhereThursday: [],
      elsewhereFriday: [],
      elsewhereSaturday: [],
      elsewhereSunday: [],
    };
  }
  componentDidMount() {
    var curr = new Date();
    var first = (curr.getDate() - curr.getDay())+1;
    var month = curr.getMonth() + 1;
    this.setState({first: first});
    var thisMonday = new Date(curr.setDate(first)).toDateString();
    var nextMonday = new Date(curr.setDate(first+6)).toDateString();
    this.setState({
      today: first,
      month: month,
      thisMonday: thisMonday,
      nextMonday: nextMonday
    });
  }

  //seperate readify and other location events
  sortByLocation(events) {
    var dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    //empty the arrays so the events won't be duplicated in the view
    //array.pop is the fastest method in our case
    while(this.state.readifyMonday.length) {
      this.state.readifyMonday.pop();
    }
    while(this.state.readifyTuesday.length) {
      this.state.readifyTuesday.pop();
    }
    while(this.state.readifyWednesday.length) {
      this.state.readifyWednesday.pop();
    }
    while(this.state.readifyThursday.length) {
      this.state.readifyThursday.pop();
    }
    while(this.state.readifyFriday.length) {
      this.state.readifyFriday.pop();
    }
    while(this.state.readifySaturday.length) {
      this.state.readifySaturday.pop();
    }
    while(this.state.readifySunday.length) {
      this.state.readifySunday.pop();
    }
    while(this.state.elsewhereMonday.length) {
      this.state.elsewhereMonday.pop();
    }
    while(this.state.elsewhereTuesday.length) {
      this.state.elsewhereTuesday.pop();
    }
    while(this.state.elsewhereWednesday.length) {
      this.state.elsewhereWednesday.pop();
    }
    while(this.state.elsewhereThursday.length) {
      this.state.elsewhereThursday.pop();
    }
    while(this.state.elsewhereFriday.length) {
      this.state.elsewhereFriday.pop();
    }
    while(this.state.elsewhereSaturday.length) {
      this.state.elsewhereSaturday.pop();
    }
    while(this.state.elsewhereSunday.length) {
      this.state.elsewhereSunday.pop();
    }
    //filter out the events which are not this month
    const monthlyFilteredEvents = events.events.filter(event => {
      return event.mm == this.state.month;
    });
    //filter out events which are not this week
    const weeklyFilteredEvents = monthlyFilteredEvents.filter(event => {
      //debugger
      var last = (this.state.first+6)%30;
      return ((event.dd >= this.state.first) && (event.dd <= last))
    });
    //list events by location
    weeklyFilteredEvents.map(event => {
      if (event.location === "Readify" ) {
        var date = new Date(event.date);
        var dayName = dayNames[date.getDay()];
        switch (dayName) {
          case "Monday":
            return this.state.readifyMonday.push(event);
          case "Tuesday":
            return this.state.readifyTuesday.push(event);
          case "Wednesday":
            return this.state.readifyWednesday.push(event);
          case "Thursday":
            return this.state.readifyThursday.push(event);
          case "Friday":
            return this.state.readifyFriday.push(event);
          case "Saturday":
            return this.state.readifySaturday.push(event);
          case "Sunday":
            return this.state.readifySunday.push(event);
        }
      }
      if (event.location === "Elsewhere" ) {
         date = new Date(event.date);
         dayName = dayNames[date.getDay()];
        switch (dayName) {
          case "Monday":
            return this.state.elsewhereMonday.push(event);
          case "Tuesday":
            return this.state.elsewhereTuesday.push(event);
          case "Wednesday":
            return this.state.elsewhereWednesday.push(event);
          case "Thursday":
            return this.state.elsewhereThursday.push(event);
          case "Friday":
            return this.state.elsewhereFriday.push(event);
          case "Saturday":
            return this.state.elsewhereSaturday.push(event);
          case "Sunday":
            return this.state.elsewhereSunday.push(event);
        }
      }
    });
  }
  lastWeek = () => {
    var thisMonday = new Date(this.state.thisMonday);
    thisMonday = new Date(thisMonday.setDate(thisMonday.getDate()-7));
    var first = (thisMonday.getDate() - thisMonday.getDay())+1;
    var month = thisMonday.getMonth()+1;
    thisMonday = thisMonday.toDateString();
    this.setState({
      thisMonday: thisMonday,
      month: month,
      first: first
    });
  }
  nextWeek = () => {
    var thisMonday = new Date(this.state.thisMonday);
    thisMonday = new Date(thisMonday.setDate(thisMonday.getDate()+7));
    var first = (thisMonday.getDate() - thisMonday.getDay())+1;
    var month = thisMonday.getMonth()+1;
    thisMonday = thisMonday.toDateString();
    this.setState({
      thisMonday: thisMonday,
      month: month,
      first: first
    });
  }
  render() {
    const  events = this.props;
    if ( events.events !== undefined) {
      this.sortByLocation( events);
    }

    return (
      <div className="App">
        <Navigation />
        <Container>
          <Table striped>
            <thead>
              <tr>
                <th>
                  <Alert className="week-info" color="info">
                    <Button className="material-icons" size="lg" color="" onClick={this.lastWeek}>arrow_left </Button>
                    {this.state.thisMonday}
                    <Button className="material-icons" size="lg" color="" onClick={this.nextWeek}>arrow_right</Button>
                  </Alert>
                </th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <Alert color="warning">Readify</Alert>
                </th>
                <td>
                  <div className="each-col" id="monday">
                    {this.state.readifyMonday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="tuesday">
                    {this.state.readifyTuesday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="wednesday">
                    {this.state.readifyWednesday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="thurday">
                    {this.state.readifyThursday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="friday">
                    {this.state.readifyFriday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="satuday">
                    {this.state.readifySaturday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="sunday">
                    {this.state.readifySunday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
              </tr>
              <tr>
                <th scope="row">
                  <Alert color="warning">Elsewhere</Alert>
                </th>
                <td>
                  <div className="each-col" id="monday">
                    {this.state.elsewhereMonday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="tuesday">
                    {this.state.elsewhereTuesday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="wednesday">
                    {this.state.elsewhereWednesday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="thurday">
                    {this.state.elsewhereThursday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="friday">
                    {this.state.elsewhereFriday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="satuday">
                    {this.state.elsewhereSaturday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="each-col" id="sunday">
                    {this.state.elsewhereSunday.map(event => (
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events: state.firestore.ordered.events
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "events" }])
)(App);
