import { Button, Card, Modal, Select, Tabs } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import FormComponent from "./components/Form";
import ModalEdit from "./components/EditModal";
import CardItem from "./components/Card";
const App = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState("gardening");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMoveOpen, setIsModalMoveOpen] = useState(false);
  const [editData, setEditData] = useState({});
  const [movingData, setMovingData] = useState({});
  useEffect(() => {
    getData();
  }, [type]);

  const getEditData = (_id) => {
    setEditData(data.filter((value) => value._id == _id)[0]);
    setIsModalOpen(true);
  };

  const getData = () => {
    axios({
      url: `http://localhost:8080/flower/${type}`,
    }).then((response) => {
      setData(response.data.data);
    });
  };

  const getMoveData = (_id) => {
    setMovingData(data.filter((value) => value._id == _id)[0]);
    setIsModalMoveOpen(true);
  };

  const changeMoveData = (e) => {
    setMovingData({
      ...movingData,
      type: e,
    });
  };

  const changeEditData = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (e, type) => {
    await axios({
      url: `http://localhost:8080/flower/${type}`,
      method: "POST",
      data: e,
    });
  };
  const deleteOne = async (_id) => {
    await axios({
      url: `http://localhost:8080/flower/${type}/${_id}`,
      method: "DELETE",
    });
    setData(data.filter((value) => value._id != _id));
  };

  const updateOne = async () => {
    await axios({
      url: `http://localhost:8080/flower/${type}/${editData._id}`,
      method: "PUT",
      data: editData,
    });
    setData(
      data.map((value) => (value._id == editData._id ? editData : value))
    );
    setIsModalOpen(false);
  };
  const moveOne = async () => {
    await deleteOne(movingData._id);
    await onFinish(movingData, movingData.type);
    getData();
    setIsModalMoveOpen(false);
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
            {data.map((value) => {
              return (
                <CardItem
                  key={value._id}
                  value={value}
                  deleteOne={deleteOne}
                  getEditData={getEditData}
                  getMoveData={getMoveData}
                />
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
          <FormComponent onFinish={onFinish} />
        </div>
      ),
    },
  ];
  return (
    <div>
      <ModalEdit
        changeEditData={changeEditData}
        updateOne={updateOne}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        editData={editData}
      />
      <Modal
        open={isModalMoveOpen}
        onCancel={() => setIsModalMoveOpen(false)}
        footer={false}>
        <Card title={movingData.title} size="small">
          <img src={movingData.image} alt="" style={{ width: "100%" }} />
          <p>{movingData.description}</p>
          <div
            style={{
              width: "100%",
              display: "flex",
              gap: "30px",
            }}>
            <Button danger type="dashed" onClick={moveOne}>
              Move to
            </Button>
            <Select
              defaultValue={type}
              style={{
                width: "150px",
              }}
              onChange={(e) => changeMoveData(e)}
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
          </div>
        </Card>
      </Modal>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
};

export default App;
