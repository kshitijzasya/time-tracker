import React, { useState, useEffect } from "react";
import { BasicLayout } from "../../components/layouts/basic";
//import bootstrap components
import {
  Form,
  Button,
} from 'react-bootstrap';
//Import API calls
import Calls from "../../../helpers/apicalls";

const Login = _ => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitLoginForm = async(e) => {
    Calls.GET('login')
    e.preventDefault();
    if ( email === '' || password === '' ) {
      console.log('Please fill in all fields');
      return false;
    }
    let response = await Calls.POST('login', {email, password});
  }
  return (
    <>
      <div className="flex h-screen">
          <Form className="m-auto rounded border-slate-300" onSubmit={submitLoginForm}>
            <Form.Group className="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="formBasicEmail">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="px-2 py-2 text-center">
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Form.Group>
          </Form>
      </div>
    </>
  );
};

export default BasicLayout(Login);

