import React from "react";

const BookItem = props => {
  const { item } = props;

  return (
    <li className="list__item" data-id={item.id}>
      <figure className="list__image-wrapper">
        <img
          className="list__image"
          src={`https://books.google.com/books/content?id=${
            item.id
          }&printsec=frontcover&img=1&zoom=5&edge=curl`}
          alt={item.volumeInfo.title}
        />
      </figure>
      <div className="list__description">
        <h2 className="list__title">{item.volumeInfo.title}</h2>
        <span>
          {item.volumeInfo.description
            ? item.volumeInfo.description.substr(0, 150) + "..."
            : "Brak opisu."}
        </span>
      </div>
    </li>
  );
};

export default BookItem;
