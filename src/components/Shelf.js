import React from "react";
import { Book } from "./Book";

export const Shelf = ({ books, moveBooks, title }) => {
  return (
    <>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => {
              return (
                <li key={book.id}>
                  <Book moveBooks={moveBooks} book={book} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
};
