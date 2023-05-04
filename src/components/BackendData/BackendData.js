import { useState } from "react";

function MovieForm() {
  const [formData, setFormData] = useState({
    rank: "",
    title: "",
    thumbnail: "",
    rating: "",
    year: "",
    image: "",
    description: "",
    trailer: "",
    genre: "",
    director: "",
    writers: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/movie/updateData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      

      <label htmlFor="title"> Title- : </label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
      />
      <br />
      <br />

      <label htmlFor="rating"> Rating:</label>
      <input
        type="text"
        id="rating"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
      />
      <br />
      <br />
       
      <button type="submit">Submit</button>
    </form>
  );
}

export default MovieForm;
