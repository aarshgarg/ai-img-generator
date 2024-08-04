import { useRef, useState } from "react";

const ImageGenerator = () => {
  const imgAddress =
    "https://images.deepai.org/machine-learning-models/b6dcce965af54c26918924813f3cd288/cyborg.jpg";
  const [imageUrl, setImageUrl] = useState(null); // Changed initial state to null

  const [loader, setLoader] = useState(false);
  const inputRef = useRef(null);

  const generateImage = async () => {
    setLoader(true);

    if (!inputRef.current || inputRef.current.value === "") {
      return;
    }

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer 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", // Replace with your API key
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "256x256",
        }),
      }
    ).catch((err) => {
      console.log(err);
    });

    const data = await response.json();


    // Assuming data contains image URL, update imageUrl state
    setImageUrl(data.data[0].url);
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return (
    <div className="ai-image-generator-container">
      <div className="header">
        <h2>
          AI Image <span>Generator</span>
        </h2>
      </div>
      <div className="img-container">
        <div className="image">
          <img src={imageUrl || imgAddress} alt="aiImage" />
        </div>
        <div className="search-box-container">
          <input
            type="text"
            ref={inputRef}
            className="search-input"
            placeholder="Describe what you want to create..."
          />
          <button className="img-generator-btn" onClick={generateImage}>
            Generate
          </button>
        </div>
      </div>
      {loader ? <span className="loader"></span> : ""}
    </div>
  );
};

export default ImageGenerator;
