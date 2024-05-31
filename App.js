import { useState } from 'react';
import './App.css';

function App() {
  const [image, setImage] = useState("");

  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }

  function uploadImage() {
    fetch("http://localhost:3002/bso/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        name: "Team Namibia",
        type: "Non-profit Organization",
        contactNumber: "081 329 7225",
        website: "https://teamnamibia.com/",
        email: "admin@teamnamibia.com",
        description: "Team Namibia is dedicated to promoting local products and businesses, driving economic growth, and creating jobs in Namibia. As a public-private partnership, Team Namibia supports MSMEs by raising awareness of locally produced goods and services, facilitating market access, and fostering collaboration among businesses. Whether you're a producer, retailer, or consumer, Team Namibia encourages you to buy local and support the growth of Namibia's economy.",
        logo: image
      })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.error('Error:', error));
  }

  return (
    <div className="App">
      <input 
        accept='image/*'
        type='file'
        onChange={convertToBase64}
      />
      {image === "" || image === null ? "" : <img width={100} height={100} src={image} alt="Preview" />}
      <button onClick={uploadImage}>Upload</button>
    </div>
  );
}

export default App;
