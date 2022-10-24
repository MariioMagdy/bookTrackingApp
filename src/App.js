import "./App.css";
import { useState, useEffect } from "react";
import { Shelves } from "./components/Shelves";
import * as BooksAPI from "./BooksAPI";
import { Book } from "./components/Book";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  const [showSearchPage, setShowSearchpage] = useState(false);
  const [Books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [Error, SetError] = useState(undefined);
  const [newSearch, setSearchResult] = useState([]);
  const [merge, setMerge] = useState([]);
  const [idBook, setIdBook] = useState(new Map());

  useEffect(() => {
    const getBooks = async () => {
      const res = await BooksAPI.getAll();
      setBooks(res);
      setIdBook(idMap(res));
      console.log(res);
    };

    getBooks();
  }, []);

  useEffect(() => {
    let active = true;
    if (searchQuery) {
      const searchFun = async () => {
        const res = await BooksAPI.search(searchQuery);
        console.log(res);
        if (res?.error && !res.length) {
          SetError(true);
          setSearchResult([]);
        } else {
          SetError(false);
          setSearchResult(res);
          console.log(newSearch);
        }
      };
      searchFun();
    } else {
      setSearchResult([]);
    }
  }, [searchQuery]);

  console.log(Books);

  const moveBooks = (book, moveTo) => {
    const updateBook = Books.map((b) => {
      if (b.id === book.id) {
        book.shelf = moveTo;
        return book;
      }
      return b;
    });
    if (!idBook.has(book.id)) {
      book.shelf = moveTo;
      updateBook.push(book);
    }

    setBooks(updateBook);

    const updateArray = async () => {
      await BooksAPI.update(book, moveTo);
    };
    updateArray();
  };

  useEffect(() => {
    const NewShelfArr = newSearch.map((book) => {
      if (idBook.has(book.id)) {
        return idBook.get(book.id);
      } else {
        return book;
      }
    });
    setMerge(NewShelfArr);
  }, [newSearch]);

  const idMap = (books) => {
    const map = new Map();
    books.map((book) => {
      return map.set(book.id, book);
    });
    return map;
  };
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <div className="app">
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <Shelves Books={Books} moveBooks={moveBooks} />
                </div>
              </div>
              <div className="open-search">
                <Link
                  to="/search"
                  onClick={() => setShowSearchpage(!showSearchPage)}
                >
                  Add a book
                </Link>
              </div>
            </div>
          </div>
        }
      />
      <Route
        exact
        path="/search"
        element={
          <div className="search-books">
            <div className="search-books-bar">
              <Link
                to={"/"}
                className="close-search"
                onClick={() => setShowSearchpage(!showSearchPage)}
              >
                Close
              </Link>
              <div className="search-books-input-wrapper">
                <input
                  type="text"
                  placeholder="Search by title, author, or ISBN"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {merge.map((book) => {
                  return (
                    <li key={book.id}>
                      <Book moveBooks={moveBooks} book={book} />
                    </li>
                  );
                })}
              </ol>
            </div>
            {Error && <div>No Books are available with this name </div>}
          </div>
        }
      />
    </Routes>
  );
}

export default App;
