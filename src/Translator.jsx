import TextField from "@mui/material/TextField"; 
import { useEffect, useState } from "react"; 

function Translator() {
  const [userInput, setUserInput] = useState(""); 
  const [languages, setLanguages] = useState([]); 
  const [sourceLanguage, setSourceLanguage] = useState(""); 
  const [destinationLanguage, setDestinationLanguage] = useState(""); 
  const [translatedText, setTranslatedText] = useState(""); 

  // Function to fetch available languages from the API
  async function fetchData() {
    const response = await fetch("https://text-translator2.p.rapidapi.com/getLanguages", {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'c17f4e1e76mshe616e0cb9ee4907p19bfa6jsn42a5f96ea71c', // API key
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com' // API host
      }
    });

    const result = await response.json(); // Parsing the response to JSON
    setLanguages(result.data.languages); // Updating the languages state with the fetched languages
  }

  // Function to translate the text using the API
  async function translateData(data) {
    let response = await fetch("https://text-translator2.p.rapidapi.com/translate", {
      method: 'POST',
      headers: {
        'x-rapidapi-key': 'c17f4e1e76mshe616e0cb9ee4907p19bfa6jsn42a5f96ea71c', // API key
        'x-rapidapi-host': 'text-translator2.p.rapidapi.com' // API host
      },
      body: data // Sending the form data as the request body
    });
    let results = await response.json(); // Parsing the response to JSON
    setTranslatedText(results.data.translatedText); // Updating the translatedText state with the fetched translation
  }

  // Function to handle the translation process
  function translateText() {
    if (userInput === '') {
      alert("Input field is required !!") // Alerting the user if the input field is empty
      return;
    }
    const data = new FormData(); // Creating a new FormData object
    data.append("source_language", sourceLanguage); // Adding the source language to the form data
    data.append("target_language", destinationLanguage); // Adding the destination language to the form data
    data.append("text", userInput); // Adding the user input text to the form data

    translateData(data); // Calling the translateData function with the form data

    // Resetting the input fields
    setUserInput("");
    setSourceLanguage("");
    setDestinationLanguage("")
  }

  // Using useEffect to fetch available languages when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <>
      <div className="container">
        <h2>Linguify👽</h2>
  
        <TextField
          id="outlined-basic"
          label="Give your keyboard a workout..."
          variant="outlined"
          style={{ width: "100%", margin: "1rem 0rem" }}
          value={userInput} // Binding the value to the userInput state
          onChange={(e) => { setUserInput(e.currentTarget.value) }} // Updating the userInput state when the input changes
          required
        />
  
        <div className="option-container">
          <div className="options">
            <p>Pick the language you’re writing in:</p>
            <select onChange={(e) => { setSourceLanguage(e.currentTarget.value) }}>
              <option value="select language">Choose your tongue</option>
              {languages.map((item, index) => {
                return <option key={index} value={item.code}>{item.name}</option>
              })}
            </select>
          </div>
          <div className="options">
            <p>Select the language you'd like to translate to:</p>
            <select onChange={(e) => { setDestinationLanguage(e.currentTarget.value) }}>
              <option value="selected language">Choose the language you wish to translate to:</option>
              {languages.map((item, index) => {
                return <option key={index} value={item.code}>{item.name}</option>
              })}
            </select>
          </div>
        </div>
  
        <button onClick={(e) => { translateText() }}>💻Translate This!🔀</button>
  
        {translatedText.length > 0 ?
          <div className="output-container">
            <p className="head">Your Translation:</p>
            <p className="trans">{translatedText}</p>
          </div> : ""}
      </div>
    </>
  );
}

export default Translator; // Exporting the Translator component
