import React from "react";
import { Form, Input, Button } from "antd";

export default () => (
  <>
    <div className="container mx-auto px-4 py-4">
      <Form className="columns-3">
        <Form.Item
          className="w-full px-4 py-3"
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Email is required to proceed"
            }
          ]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          className="w-full px-4 py-3"
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required to proceed"
            }
          ]}
        >
          <Input.Password />

        </Form.Item>

        <Form.Item className='container mx-auto px-4 py-4 text-center'>
          <Button type="primary" onClick={e => console.log('inside submit')}>Login</Button>
        </Form.Item>
      </Form>
    </div>
  </>
)

