import { Button, Form, Input, Modal } from "antd";
import React from "react";

const ModalEdit = ({
  changeEditData,
  handleCancel,
  updateOne,
  isModalOpen,
  editData,
}) => {
  return (
    <Modal
      footer={false}
      title="Basic Modal"
      open={isModalOpen}
      onCancel={handleCancel}>
      <Form
        onFinish={updateOne}
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
          <Input
            defaultValue={editData.image}
            onChange={changeEditData}
            name="image"
          />
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
          <Input
            defaultValue={editData.title}
            value={editData.title}
            onChange={changeEditData}
            name="title"
          />
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
          <Input
            name="description"
            defaultValue={editData.description}
            onChange={changeEditData}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}>
          <Button type="primary" htmlType="submit">
            Edit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEdit;
