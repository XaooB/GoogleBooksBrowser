import axios from "axios";

export default async options => {
  const { query, index } = options;

  const response = await axios.get(
    "https://www.googleapis.com/books/v1/volumes?",
    {
      params: {
        q: query,
        startIndex: index,
        key: process.env.key
      }
    }
  );

  return response.data;
};
