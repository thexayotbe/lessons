import { Button, Form, Input, Select } from "antd";
import axios from "axios";
import React, { useState } from "react";

const FormComponent = ({ onFinish }) => {
  const [type, setType] = useState("gardening");
  const addData = (e) => {
    onFinish(e, type);
  };
  return (
    <Form
      onFinish={addData}
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off">
      <Form.Item
        label="Image"
        name="image"
        rules={[
          {
            required: true,
            message: "Please input your image!",
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your title!",
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input your Description!",
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Select Type"
        name="type"
        rules={[
          {
            required: true,
            message: "Please input your Type!",
          },
        ]}>
        <Select
          onChange={(e) => setType(e)}
          options={[
            {
              value: "gardening",
              label: "Gardening",
            },
            {
              value: "homepot",
              label: "Home-Pot",
            },
            {
              value: "domestic",
              label: "Domestic",
            },
          ]}
        />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormComponent;
