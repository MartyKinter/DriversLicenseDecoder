/* eslint-disable react/prop-types */
export default function Results({ result, error }) {
  return (
    <>
      {result ? (
        <div className="results-container">
          <h2>License Data</h2>
          <div className="license-data">
            <p>
              <span className="result-title">Name:</span>
              <span className="fill-box">{result.fullName}</span>
            </p>
            <p>
              <span className="result-title">Address:</span>
              <span className="fill-box">{result.fullAddress}</span>
            </p>
            <p>
              <span className="result-title">Date of Birth:</span>
              <span className="fill-box">{result.dateOfBirth}</span>
            </p>
            <p>
              <span className="result-title">Issue Date:</span>
              <span className="fill-box">{result.issueDate}</span>
            </p>
            <p>
              <span className="result-title">Expiration Date:</span>
              <span className="fill-box">{result.expirationDate}</span>
            </p>
            {error && <p className="error">Error: {error}</p>}
          </div>
        </div>
      ) : (
        <div className="results-container">
          <h2>License Data</h2>
          <div className="license-data">
            <p>
              <span className="result-title">Name:</span>
              <span className="fill-box"></span>
            </p>
            <p>
              <span className="result-title">Address:</span>
              <span className="fill-box"></span>
            </p>
            <p>
              <span className="result-title">Date of Birth:</span>
              <span className="fill-box"></span>
            </p>
            <p>
              <span className="result-title">Issue Date:</span>
              <span className="fill-box"></span>
            </p>
            <p>
              <span className="result-title">Expiration Date:</span>
              <span className="fill-box"></span>
            </p>
            {error && <p className="error">Error: {error}</p>}
          </div>
        </div>
      )}
    </>
  );
}
