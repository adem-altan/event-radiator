import React, { Component } from "react";
import "./App.css";
import { Container, Table } from "reactstrap";
import { Alert, Button } from "reactstrap";
import Navigation from "./components/Navigation";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import uuidv1 from  'uuid/v1';

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
      month: null,
      first: null,
      thisMonday: null,
      nextMonday: null,
      Readify: [],
      Elsewhere: []
    };
  }
  componentDidMount() {
    var curr = new Date();
    var first = curr.getDate() - curr.getDay() + 1;
    var month = curr.getMonth() + 1;
    this.setState({ first: first });
    var thisMonday = new Date(curr.setDate(first)).toDateString();
    var nextMonday = new Date(curr.setDate(first + 6)).toDateString();
    this.setState({
      month: month,
      thisMonday: thisMonday,
      nextMonday: nextMonday
    });
  }

  //this function seperates Readify and other location events
  sortByLocation(events) {
    var last = (this.state.first + 6) % 30;
    //empty the arrays so the events won't be duplicated in the view
    this.state.Readify = [];
    this.state.Elsewhere = [];

    const monthlyFilteredEvents = events.events.filter(event => {
      return (
        event.mm == this.state.month ||
        event.mm == this.state.month + 1 ||
        event.mm == this.state.month - 1
      );
    });
    //filter out events which are not this week
    const weeklyFilteredEvents = monthlyFilteredEvents.filter(event => {
      //limit range to 7 days if the event is not from this month
      if (event.mm != this.state.month && event.dd > 7) {
        return false;
      }
      //Event is within the first week
      //therefore it will be in the next month's event
      if (((new Date(this.state.thisMonday).getDate() + 7) % 30 < 7))  {
        return event.dd >= this.state.first || event.dd <= last;
      } else {
        //only the events within the current week will be considered
        return event.dd >= this.state.first && event.dd <= last;
      }
    });
    //seperate events by location
    weeklyFilteredEvents.map(event => {
      event.location === "Readify"
        ? this.state.Readify.push(event)
        : this.state.Elsewhere.push(event);
    });
  }
  //this function gets called when left arrow is clicked
  //user can see last weeks' events
  lastWeek = () => {
    var thisMonday = new Date(this.state.thisMonday);
    thisMonday = new Date(thisMonday.setDate(thisMonday.getDate() - 7));
    var first = thisMonday.getDate() - thisMonday.getDay() + 1;
    var month = thisMonday.getMonth() + 1;
    thisMonday = thisMonday.toDateString();
    this.setState({
      thisMonday: thisMonday,
      month: month,
      first: first
    });
  };
  //this function gets called when right arrow is clicked
  //user can see last weeks' events
  nextWeek = () => {
    var thisMonday = new Date(this.state.thisMonday);
    thisMonday = new Date(thisMonday.setDate(thisMonday.getDate() + 7));
    var first = thisMonday.getDate() - thisMonday.getDay() + 1;
    var month = thisMonday.getMonth() + 1;
    thisMonday = thisMonday.toDateString();
    this.setState({
      thisMonday: thisMonday,
      month: month,
      first: first
    });
  };
  getEventDay = (event) => {
    var eventDate = new Date(event.date);
    var weekBeginning = new Date(this.state.thisMonday);
    var weekEnding = new Date();
    weekEnding.setDate(weekBeginning.getDate()+6);
    weekEnding.setMonth(weekEnding.getMonth()+1);
    
    //eleminate events outside of the week
    if((eventDate >= weekBeginning) && (eventDate <= weekEnding)) {
      var date = new Date(event.date).getDay()-1;
      var day = DAYS[date];
      day == undefined ? day = 'Sunday' : day = day;
      return day;
    } else {
      return false;
    }
  };

  render() {
    const events = this.props;
    if (events.events !== undefined) {
      this.sortByLocation(events);
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
                    <Button
                      className="material-icons"
                      size="lg"
                      color=""
                      onClick={this.lastWeek}
                    >
                      arrow_left
                    </Button>
                    {this.state.thisMonday}
                    <Button
                      className="material-icons"
                      size="lg"
                      color=""
                      onClick={this.nextWeek}
                    >
                      arrow_right
                    </Button>
                  </Alert>
                </th>
                {DAYS.map(day => {
                  return <th key={day}>{day}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">
                  <Alert color="warning">Readify</Alert>
                </th>
                {DAYS.map(day => {
                  return (
                    <td key={day}>
                      <div className="each-col" id={day}>
                        {this.state.Readify.map(readifyEvent => {
                          return this.getEventDay(readifyEvent) === day ? (
                            <Button key={readifyEvent.id}>{readifyEvent.name}</Button>
                          ) : (
                            <div key={uuidv1()} />
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row">
                  <Alert color="warning">Elsewhere</Alert>
                </th>
                {DAYS.map(day => {
                  return (
                    <td key={day}>
                      <div className="each-col" id={day}>
                        {this.state.Elsewhere.map(elsewhereEvent => {
                          return this.getEventDay(elsewhereEvent) === day ? (
                            <Button key={elsewhereEvent.id}>{elsewhereEvent.name}</Button>
                          ) : (
                            <div key={uuidv1()}/>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    events: state.firestore.ordered.events
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "events" }])
)(App);
