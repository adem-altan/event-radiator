import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav
} from "reactstrap";
import { Switch, Route } from "react-router-dom";
import AddAnEvent from "./AddAnEv";

export default class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded" light>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <Switch>
                <Route path="/" component={AddAnEvent} />
              </Switch>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
