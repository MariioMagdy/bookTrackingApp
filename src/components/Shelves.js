import React from "react";
import { Shelf } from "./Shelf";

export const Shelves = ({ Books, moveBooks }) => {
  return (
    <div>
      <Shelf
        title="Currently Reading"
        books={Books.filter((b) => {
          return b.shelf === "currentlyReading";
        })}
        moveBooks={moveBooks}
      />
      <Shelf
        title="what To Read"
        books={Books.filter((b) => {
          return b.shelf === "wantToRead";
        })}
        moveBooks={moveBooks}
      />
      <Shelf
        title="Read"
        books={Books.filter((b) => {
          return b.shelf === "read";
        })}
        moveBooks={moveBooks}
      />
    </div>
  );
};
