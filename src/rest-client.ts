const restClient = async (url) => {
  try {
    const data = await fetch(url);
    const response = await data.json();
    return response;
  } catch (error) {
    console.error(error);
  }
};

export { restClient };
