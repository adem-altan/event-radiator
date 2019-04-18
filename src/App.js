import React, { Component } from "react";
import "./App.css";
import { Container, Table } from "reactstrap";
import ReactStickies from "react-stickies";
import { Alert, Button } from 'reactstrap';
import Navigation from "./components/Navigation";


class App extends Component {
 constructor(props) {
   super(props);
   this.state = {
     thisMonday: null,
     nextMonday: null
   }
 }
  componentDidMount() {
    var curr = new Date();
    var first = curr.getDate() - curr.getDay();
    var first = first + 1;
    var last = first + 7;
    var thisMonday = new Date(curr.setDate(first)).toDateString();
    var nextMonday = new Date(curr.setDate(last)).toDateString();
    this.setState({
      thisMonday: thisMonday,
      nextMonday: nextMonday
    });
  }
  
  render() {
    return (
      <div className="App">
        <Navigation>
          
        </Navigation>
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
                <th>
                  <Alert color="info">
                    {this.state.nextMonday}
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
                  <div className="each-col">
                    <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                  <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td> </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
              </tr>
              <tr>
              <th scope="row"><Alert color="warning">Elsewhere</Alert></th>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td> </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
                  <Button color="secondary">EVENT TITLE</Button>
                    <Button color="secondary">EVENT TITLE</Button>
                  </div>
                </td>
                <td>
                  <div className="each-col">
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
export default App;
