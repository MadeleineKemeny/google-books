import React from "react";
import "./style.css";

function Jumbotron() {
  return (
    <div className="jumbotron text-center">
      <h1>Book Search</h1>
      <a target="_blank" rel="noopener noreferrer" href="https://books.google.com/">
        Powered by React and Google
      </a>
    </div>
  );
}

export default Jumbotron;
