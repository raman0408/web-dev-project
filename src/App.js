import { useState } from "react";
import "./App.css";

function App(){
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(null);
    const [history, setHistory] = useState([]);
    const [fileName, setFileName] = useState("");

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if(!file) return;
        if (!file.type.startsWith("image/")) {
          alert("Please upload a valid image file.");
          return;
        }
        setImage(URL.createObjectURL(file));
        setFileName(file.name);
        setResult(null);
    };
    const handleAnalyze = () => {
        setLoading(true);
        
        setTimeout(()=> {
          const isReal = Math.random() > 0.5;
          const newResult = {
            verdict: isReal ? "Real" : "Fake",
            confidence: Math.floor(Math.random() * 30) + 70,
            fileName: fileName
          };
            setResult(newResult);
            setHistory(prev => [
              newResult,
              ...prev.slice(0, 4)
            ]);
          setLoading(false);
        }, 2000);
    };
    return (
        <div className="app">
            <nav>
                <h3>Truth Lens</h3>
                <div className="nav-links">
                  <a href="#home">Home</a>
                  <a href="#analyzer">Analyzer</a>
                </div>
            </nav>
            <section id="home">
                <h1>Truth Lens</h1>
                <button onClick={()=>{
                    document.getElementById("analyzer").scrollIntoView({behavior:"smooth"});
                }}>Get Started</button>
            </section>
            <section id="analyzer">
              <fieldset className="analyzer-box">
                  <legend>Image Analysis</legend>
                  <p className="analyzer-instructions">
                    Upload an image to analyze whether it is real or AI-generated.
                  </p>
                  <div
                    className="drop-box"
                    onDragOver={(e)=>e.preventDefault()}
                    onDrop={(e)=>{
                      e.preventDefault();
                      const file = e.dataTransfer.files[0];

                      if (!file) return;

                      if (!file.type.startsWith("image/")) {
                        alert("Please upload a valid image file.");
                        return;
                      }

                      setImage(URL.createObjectURL(file));
                      setFileName(file.name);
                      setResult(null);
                    }}
                  >
                    <div className="drop-text"> 
                    <p>
                      Drag & Drop an image here or{" "}
                      <label htmlFor="fileInput" className="upload-link" >
                        Click here to upload
                      </label>
                    </p>
                    <input
                      id="fileInput"
                      type="file"
                      onChange={handleUpload}
                      style={{ display: "none" }}
                    />
                    </div>
                  </div>
                  {image && (
                      <div>
                          <img src={image} alt="preview" width="200" />
                          <br />
                          <button onClick={handleAnalyze} disabled={loading} >
                              Analyze
                          </button>
                      </div>
                  )}
                </fieldset>
                {loading && <p>Analyzing...</p>}
                
                {result && (
                  <>
                  <div className={`result-card ${result.verdict.toLowerCase()}`}>
                    <h3 className="result-title">{result.verdict}</h3>
                    <p className="result-confidence">
                      Confidence: {result.confidence}%
                    </p>
                  </div>
                  <button
                    className="reset-btn"
                    onClick={() => {
                      setImage(null);
                      setResult(null);
                      setLoading(false);
                    }}
                  >
                    Try Another Image
                  </button>
                  </>
                )}
                {history.length > 0 && (
                  <div className="history-box">
                    <h4>Previous Analyses</h4>

                    {history.map((h, i) => (
                      <p key={i}>
                        {h.verdict} ({h.confidence}%) - {h.fileName}
                      </p>
                    ))}
                  </div>
                )}
                

            </section>
            <footer className="footer">
              <div className="footer-divider"></div>
              <p>
                © 2026 Truth Lens | Team Members: Aditya Raman, Prithvi K Bagadia,
                Kavin Iyappan Kasi Shanmugam, Ashrit Puralachetty, Alin Renit
              </p>
            </footer>
        </div>
    )
}
export default App;