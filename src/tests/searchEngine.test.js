import React from "react";
import { shallow, configure, mount } from "enzyme";
import SearchEngine from "../components/searchEngine";
import Adapter from "enzyme-adapter-react-16";
import { exportAllDeclaration } from "@babel/types";

configure({ adapter: new Adapter() });

describe("<SearchEngine />", () => {
  let outer;
  beforeEach(() => {
    outer = shallow(<SearchEngine />);
  });
  it("renders an search form with 3 inputs", () => {
    const Children = outer.props().children({});
    const wrapper = shallow(Children);
    expect(wrapper.find("input")).toHaveLength(3);
  });
  it("should display an error if error=true", () => {
    outer.setState({ error: true });
    const Children = outer.props().children({});
    const wrapper = mount(Children);

    expect(wrapper.find("div.error")).toHaveLength(1);
  });
});
