import requestAPI from "./Api";

export const fetchProducts = async () => {
  const tempRes = await requestAPI
    .get("products.json")
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.error(err));

  return tempRes;
};
