const WooCommerceAPI = require("woocommerce-api");
const credConfig = require("./config");

const WooCommerce = new WooCommerceAPI({
  url: "https://hanabom.ca",
  consumerKey: credConfig.hanabomKey,
  consumerSecret: credConfig.hanabomSecret,
  wpAPI: true,
  version: "wc/v2",
});

const uploadHanabom = (newProduct, param = "") => {
  return WooCommerce.postAsync(`products/${param}`, newProduct).then((result) =>
    JSON.parse(result.toJSON().body)
  );
};

const getHanabom = (param1) => {
  return WooCommerce.getAsync("products/" + param1).then((result) =>
    JSON.parse(result.toJSON().body)
  );
};

const putHanabom = (param1, data) => {
  console.log("data:", data);
  return WooCommerce.putAsync("products/" + param1, data).then((result) =>
    JSON.parse(result.toJSON().body)
  );
};

const delHanabom = (id) => {
  return WooCommerce.deleteAsync("products/" + id)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.response.data);
    });
};

module.exports = { uploadHanabom, getHanabom, putHanabom, delHanabom };
