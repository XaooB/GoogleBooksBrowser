const fakeData = [
  {
    id: 11,
    etag: 12,
    volumeInfo: {
      title: "tytul",
      description: "opis"
    }
  }
];

export default async options => {
  const response = await new Promise(resolve => {
    resolve(fakeData);
  });

  return response;
};
