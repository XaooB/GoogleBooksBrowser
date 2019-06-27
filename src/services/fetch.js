import axios from "axios";

export default async options => {
  const { query, index } = options;

  const response = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?${query}`,
    {
      params: {
        startIndex: index,
        key: process.env.key
      }
    }
  );

  return response.data;
};
