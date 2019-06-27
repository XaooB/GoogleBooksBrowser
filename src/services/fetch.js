import axios from "axios";

export default async options => {
  const { query, index } = options;

  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?${query}$key=AIzaSyAu-a5S6Uoyh6ie-PWGYqJPRKlHWJSQlmI`,
    {
      params: {
        startIndex: index
      }
    }
  );

  return response.data;
};
