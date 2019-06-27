import React from "react";
import { BooksConsumer } from "../context/Books.context";
import BookItem from "./booksItems";

export default function Books() {
  return (
    <BooksConsumer>
      {({ books, fetching, query, totalItems, hasMore, error }) => (
        <div className="books">
          {query.length ? (
            totalItems > 0 ? (
              <ul className="list">
                {books.map(item => (
                  <BookItem key={item.etag} item={item} />
                ))}
              </ul>
            ) : (
              <div className="information">
                Nie ma książek spełniających podane warunki/warunek.
              </div>
            )
          ) : error ? (
            <div className="error">
              Wystąpił błąd podczas wysyłania zapytania do Google API!
            </div>
          ) : (
            ""
          )}
          {fetching && <div className="loading">Pobieram dane..</div>}
          {!hasMore && (
            <div className="information">
              Wszystkie możliwe książki zostały wyświetlone!
            </div>
          )}
        </div>
      )}
    </BooksConsumer>
  );
}
