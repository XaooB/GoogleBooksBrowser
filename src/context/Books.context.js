import React, { Component, createContext } from "react";
import { debounce } from "lodash";
import fetch from "../services/fetch";

const BooksContext = createContext();

export class BooksProvider extends Component {
  constructor(props) {
    super(props);

    this.getBooks = this.getBooks.bind(this);

    this.state = {
      books: [],
      startIndex: 0,
      query: "",
      error: false,
      hasMore: true,
      fetching: false,
      totalItems: 0
    };

    window.onscroll = debounce(() => {
      const { query, fetching, totalItems, books, hasMore } = this.state;
      if (fetching || !hasMore) return;
      if (
        document.documentElement.scrollTop + window.innerHeight ===
        document.documentElement.offsetHeight
      ) {
        this.setState({ fetching: true }, async () => {
          const result = await fetch({
            query: query,
            index: this.state.startIndex
          });

          if (books.length < totalItems) {
            this.setState({
              books: [...this.state.books, ...result.items],
              fetching: false,
              totalItems: result.totalItems,
              query,
              startIndex: this.state.startIndex + 10
            });
          } else {
            this.setState({ hasMore: false, fetching: false });
          }
        });
      }
    }, 150);
  }

  getBooks(query) {
    this.setState({ fetching: true, startIndex: 0 }, async () => {
      try {
        const books = await fetch({
          query: query,
          index: this.state.startIndex
        });
        this.setState({
          books: books.items,
          fetching: false,
          hasMore: true,
          totalItems: books.totalItems,
          query,
          startIndex: this.state.startIndex + 10
        });
      } catch (error) {
        this.setState({ error: true, fetching: false });
      }
    });
  }

  render() {
    const { children } = this.props;
    const { books, query, fetching, totalItems, hasMore, error } = this.state;

    return (
      <BooksContext.Provider
        value={{
          getBooks: this.getBooks,
          books,
          totalItems,
          fetching,
          query,
          error,
          hasMore
        }}
      >
        {children}
      </BooksContext.Provider>
    );
  }
}

export const BooksConsumer = BooksContext.Consumer;
