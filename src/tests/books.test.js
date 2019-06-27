import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Books from "../components/books";
import BooksContext from "../context/Books.context";
import BookItem from "../components/booksItems";

configure({ adapter: new Adapter() });
jest.mock("../services/fetch");

describe("<SearchEngine />", () => {
  let outer;
  beforeEach(() => {
    outer = shallow(<Books />);
  });

  it("renders an empty string if there's no query given", () => {
    const Children = outer.props().children({ query: "", hasMore: true });
    const wrapper = shallow(Children);
    const text = wrapper.find(".books");
    expect(text.text()).toBe("");
  });

  it("renders an error if there's one after request", () => {
    const Children = outer
      .props()
      .children({ query: "", error: true, hasMore: true });
    const wrapper = shallow(Children);
    expect(
      wrapper.contains(
        <div className="error">
          Wystąpił błąd podczas wysyłania zapytania do Google API!
        </div>
      )
    ).toEqual(true);
  });

  it("should inform about end of the books in the collection if hasMore is set to false", () => {
    const Children = outer.props().children({
      query: " ",
      hasMore: false
    });
    const wrapper = shallow(Children);
    expect(
      wrapper.contains(
        <div className="information">
          Nie ma książek spełniających podane warunki/warunek.
        </div>
      )
    ).toEqual(true);
  });

  it("should render a <BookItem /> if an array of books exist and has atleast 1 item", () => {
    const Children = outer.props().children({
      query: " ",
      totalItems: 1,
      hasMore: true,
      books: [
        {
          id: 11,
          etag: 12,
          volumeInfo: {
            title: "tytul",
            description: "opis"
          }
        }
      ]
    });
    const wrapper = shallow(Children);
    expect(wrapper.find(BookItem)).toHaveLength(1);
  });
});
