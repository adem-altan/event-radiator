import React, { Component } from "react";
import "./App.css";
import { Container, Table } from "reactstrap";
import { Alert, Button } from "reactstrap";
import Navigation from "./components/Navigation";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
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

  //this function seperates Readify and other location events
  sortByLocation(events) {
    var last = (this.state.first+6)%30;

    //empty the arrays so the events won't be duplicated in the view
    this.state.readifyMonday = [];
    this.state.readifyTuesday = [];
    this.state.readifyWednesday = [];
    this.state.readifyThursday = [];
    this.state.readifyFriday = [];
    this.state.readifySaturday = [];
    this.state.readifySunday = [];
    this.state.elsewhereMonday = [];
    this.state.elsewhereTuesday = [];
    this.state.elsewhereWednesday = [];
    this.state.elsewhereThursday = [];
    this.state.elsewhereFriday = [];
    this.state.elsewhereSaturday = [];
    this.state.elsewhereSunday = [];
    
    const monthlyFilteredEvents = events.events.filter(event => {
      return (event.mm == this.state.month || event.mm == this.state.month+1 || event.mm == this.state.month-1);
    });
    //filter out events which are not this week
    const weeklyFilteredEvents = monthlyFilteredEvents.filter(event => {
      //limit range to 7 days if the event is not from this month
      if( event.mm != this.state.month && event.dd > 7) {
        return false;
      } 
      //Event is within the first week
      //therefore it will be in the next month's event
      if((new Date(this.state.thisMonday).getDate() + 7 )% 30 < 7) {
        return ((event.dd >= this.state.first) || (event.dd <= last));
      } else { 
        //only the events within the current week will be considered
        return ((event.dd >= this.state.first) && (event.dd <= last));
      }
    });
    //list events by location
    weeklyFilteredEvents.map(event => {
      if (event.location === "Readify" ) {
        var date = new Date(event.date);
        var dayName = DAYS[date.getDay()-1];
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
         dayName = DAYS[date.getDay()];
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
  //this function gets called when left arrow is clicked
  //user can see last weeks' events
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
  //this function gets called when right arrow is clicked
  //user can see last weeks' events
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
                {DAYS.map(day => {
                  return(
                    <th>{day}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <Alert color="warning">Readify</Alert>
                </th>
                <td>
                  <div className="each-col" id="monday">
                    {this.state.readifyMonday.map(event =>
                      <Button color="secondary" key={event.id}>
                        {event.name}
                      </Button>
                    )}
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
