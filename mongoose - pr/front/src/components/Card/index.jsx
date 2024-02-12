import { Button, Card } from "antd";
import React from "react";

const CardItem = ({ value, deleteOne, getEditData, getMoveData }) => {
  const { title, description, image, _id } = value;
  return (
    <Card key={_id} title={title}>
      <img src={image} alt="" style={{ width: "100%" }} />
      <p>{description}</p>
      <div style={{ width: "100px", display: "flex", gap: "30px" }}>
        <Button danger onClick={() => deleteOne(_id)}>
          Delete
        </Button>
        <Button type="primary" onClick={() => getEditData(_id)}>
          Edit
        </Button>
        <Button danger type="dashed" onClick={() => getMoveData(_id)}>
          Move
        </Button>
      </div>
    </Card>
  );
};

export default CardItem;
