import { Button, Card, Form, Input, Select, Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("gardening");
  useEffect(() => {
    axios({
      url: `http://localhost:8080/${type}`,
    }).then((response) => {
      console.log(response.data.data);
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
                  <img src={image} alt="" style={{ width: "100px" }} />
                  <p>{title}</p>
                  <p>{description}</p>
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
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default App;
