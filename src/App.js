import React, { Component } from "react"
import "./App.css"
import { Container, Table } from "reactstrap"
import { Alert, Button } from 'reactstrap'
import Navigation from "./components/Navigation"
import { connect } from "react-redux"
import { firestoreConnect } from "react-redux-firebase"
import { compose } from "redux"

class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     today: null,
     month: null,
     thisMonday: null,
     nextMonday: null,
     readifyList: [],
     elsewhereList: []
   }
 }
  componentDidMount() {
    var curr = new Date();
    var first = curr.getDate() - curr.getDay();
    var month = curr.getMonth()+1;
    first = first + 1;
    var last = first + 7;
    var thisMonday = new Date(curr.setDate(first)).toDateString();
    var nextMonday = new Date(curr.setDate(last)).toDateString();
    this.setState({
      today: first,
      month: month,
      thisMonday: thisMonday,
      nextMonday: nextMonday
    });
  }

  //seperate readify and other location events
  sortByLocation(events) {
    events.events.map(event => {
      if(event.location === 'Readify') {
        this.state.readifyList.push(event);
      }
      if(event.location === 'Elsewhere') {
        this.state.elsewhereList.push(event);
      }
    })
    console.log(this.state.readifyList);
    console.log(this.state.elsewhereList);
  }
  render() {
    const { events } = this.props;
    if({events}.events !== undefined ){
      this.sortByLocation({events});
    }
    return (
      <div className="App">
        <Navigation />
        <Container>
          <Table striped>
            <thead>
              <tr>
                <th>
                  <Alert color="info">
                    {this.state.thisMonday}
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
                <th scope="row"><Alert color="warning">Readify</Alert></th>
                <td>
                  <div className="each-col" id={this.state.today+'/'+this.state.month}>
                  {
                    this.state.readifyList.length > 0
                    ? <Button color="secondary">EVENT TITLE</Button>
                    : <Button color="secondary">No TITLE</Button>
                  }
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+1+'/'+this.state.month}>
                  {
                    this.state.elsewhereList.length > 0
                    ? <Button color="secondary">EVENT TITLE</Button>
                    : <Button color="secondary">No TITLE</Button>
                  }
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+2+'/'+this.state.month}>
                  <Button color="secondary">EVENT TITLE</Button>
                  <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+3+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+4+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+5+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+6+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
              </tr>
              <tr>
              <th scope="row"><Alert color="warning">Elsewhere</Alert></th>
                <td>
                  <div className="each-col" id={this.state.today+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+1+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+2+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+3+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+4+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+5+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col" id={this.state.today+6+'/'+this.state.month}>
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
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
  }
}

export default compose (
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'events' } 
  ])
)(App);
