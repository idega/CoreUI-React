import React, {Component} from "react";
import {Container, Row, Col, CardGroup, Card, CardBlock, Button, Input, InputGroup, InputGroupAddon} from "reactstrap";


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleLogin() {
    var cors = require('cors');
    cors.origin = false;

    var username = this.state.username;
    var password = this.state.password;
    var authorizationCredentials = {
      url: 'http://127.0.0.1:8080/',
      clientId: 'egov_dashboard_app',
      username: username,
      password: password
    };
    var data = new FormData();
    data.append("json", JSON.stringify(authorizationCredentials));
    fetch('http://127.0.0.1:8080/authenticate/user', {
      method: 'post',
      headers: {
				'Accept': 'application/json',
				'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*'
      },
      body: data
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      alert(JSON.stringify(data))
    }).catch(function(err) {
    	alert(err);
    });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBlock className="card-body">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon><i className="icon-user"></i></InputGroupAddon>
                      <Input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} placeholder="Username"/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon><i className="icon-lock"></i></InputGroupAddon>
                      <Input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} placeholder="Password"/>
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={this.handleLogin}>Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </CardBlock>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBlock className="card-body text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBlock>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
