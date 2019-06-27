import React from "react";
import Search from "./components/searchEngine";
import Books from "./components/books";
import { BooksProvider } from "./context/Books.context";

function App() {
  return (
    <BooksProvider>
      <div className="container">
        <Search />
        <Books />
      </div>
    </BooksProvider>
  );
}

export default App;
