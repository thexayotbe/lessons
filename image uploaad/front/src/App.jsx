import React, { useEffect, useState } from "react";
import axios from "axios";

function ImageUpload() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    axios.get("http://localhost:8080/image").then((response) => {
      setImages(response.data.data);
      console.log(response.data.data);
    });
  }, [file]);
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8080/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {images.map((image) => (
        <div key={image._id}>
          <img
            src={"http://localhost:8080/image/" + image.image_source}
            alt={image.id}
          />
        </div>
      ))}
    </div>
  );
}

export default ImageUpload;
