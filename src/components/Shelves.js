import React from "react";
import { Shelf } from "./Shelf";
import { useState } from "react";

export const Shelves = ({ Books, moveBooks }) => {
  const [CurrentReading, SetCurrntReading] = useState([]);
  const [WantToRead, SetWantToRead] = useState([]);
  const [Read, SetRead] = useState([]);

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
