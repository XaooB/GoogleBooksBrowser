import React, { Component } from "react";
import { BooksConsumer } from "../context/Books.context";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      lang: "",
      author: "",
      error: false
    };
  }

  handleTitleInput = e => {
    const title = e.target.value;

    this.setState({
      title
    });
  };

  handleLangInput = e => {
    const lang = e.target.value;

    this.setState({
      lang
    });
  };

  handleAuthorInput = e => {
    const author = e.target.value;

    this.setState({
      author
    });
  };

  validateForm = () => {
    const { title, author } = this.state;

    if (title.length === 0 && author.length === 0) {
      return true;
    }
  };

  getQuery() {
    const { title, lang, author } = this.state;
    let tmpLang = "",
      tmpAuthor = "",
      tmpTitle = "";

    if (title.length > 0) tmpTitle = `intitle:${title}`;
    if (lang.length > 0) tmpLang = `langRestrict=${lang}`;
    if (author.length > 0) tmpAuthor = `+inauthor:${author}`;

    return tmpLang + "&q=" + tmpTitle + tmpAuthor;
  }

  render() {
    const { title, lang, author, error } = this.state;
    let query = this.getQuery();

    return (
      <BooksConsumer>
        {({ getBooks }) => (
          <section className="form__wrapper">
            <h1 className="form__title">Google Books API</h1>
            <form
              className="form form--inline"
              onSubmit={e => {
                e.preventDefault();

                if (this.validateForm()) {
                  return this.setState({ error: true });
                } else {
                  if (error) this.setState({ error: false });
                  getBooks(query);
                }
              }}
            >
              <div>
                <label className="label">Tytuł książki</label>
                <input
                  className="input input--left"
                  type="text"
                  name="title"
                  placeholder="The Witcher"
                  value={title}
                  onChange={this.handleTitleInput}
                />
              </div>
              <div>
                <label className="label">Autor</label>
                <input
                  className="input input--between"
                  type="text"
                  name="author"
                  placeholder="Andrzej Sapkowski"
                  value={author}
                  onChange={this.handleAuthorInput}
                />
              </div>
              <div>
                <label className="label">Język</label>
                <input
                  className="input input--right input--left input--short"
                  type="text"
                  name="language"
                  placeholder="PL"
                  value={lang}
                  maxLength="2"
                  onChange={this.handleLangInput}
                />
              </div>
              <button type="submit" className="button input--right">
                szukaj
              </button>
            </form>
            {error && (
              <div className="error">
                Pole tytuł lub autor nie może być puste!
              </div>
            )}
          </section>
        )}
      </BooksConsumer>
    );
  }
}

export default Search;
