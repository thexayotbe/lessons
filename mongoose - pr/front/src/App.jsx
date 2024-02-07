import { Button, Card, Form, Input, Modal, Select, Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("gardening");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const getEditData = (_id) => {
    setEditData(data.filter((value) => value._id == _id)[0]);
    setIsModalOpen(true);
  };
  const changeEditData = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    axios({
      url: `http://localhost:8080/${type}`,
    }).then((response) => {
      setData(response.data.data);
    });
  }, [type]);
  const onFinish = async (e) => {
    await axios({
      url: `http://localhost:8080/${type}`,
      method: "POST",
      data: e,
    });
  };
  const deleteOne = async (_id) => {
    await axios({
      url: `http://localhost:8080/${type}/${_id}`,
      method: "DELETE",
    });
    setData(data.filter((value) => value._id != _id));
  };
  const updateOne = async () => {
    await axios({
      url: `http://localhost:8080/${type}/${editData._id}`,
      method: "PUT",
      data: editData,
    });
    setData(
      data.map((value) => (value._id == editData._id ? editData : value))
    );
    setIsModalOpen(false);
  };
  const items = [
    {
      key: "1",
      label: "Rendering",
      children: (
        <div>
          <Select
            defaultValue="gardening"
            onChange={(e) => setType(e)}
            style={{
              width: 120,
            }}
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
          <div
            style={{
              display: "grid",
              width: "100%",
              gridTemplateColumns: "1fr 1fr 1fr",
              gridTemplateRows: "1fr 1fr 1fr",
              gap: "20px",
            }}>
            {data.map(({ image, title, description, _id }) => {
              return (
                <Card key={_id} title="Default size card">
                  <img src={image} alt="" style={{ width: "100%" }} />
                  <p>{title}</p>
                  <p>{description}</p>
                  <div style={{ width: "100px", display: "flex", gap: "30px" }}>
                    {" "}
                    <Button danger onClick={() => deleteOne(_id)}>
                      Delete
                    </Button>
                    <Button type="primary" onClick={() => getEditData(_id)}>
                      Edit
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Actions",
      children: (
        <div>
          <Form
            onFinish={onFinish}
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
        </div>
      ),
    },
  ];
  return (
    <div>
      <Modal
        footer={false}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
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
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default App;
