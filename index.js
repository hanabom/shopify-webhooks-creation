const handlers = require("./handlers");
const { uploadHanabom, putHanabom } = require("./hanabomAPI");
const { dbAction, dbEnd } = require("./db");

exports.handler = async (event) => {
  console.log("event:", event);
  const shopifyObj = JSON.parse(event.body);
  // const vendor = event.headers.x-shopify-shop-domain;
  // console.log(vendor);

  // Initial product setup
  let product = await handlers.basicProperties(shopifyObj);

  // Each Complex Properties setup
  product.type = await handlers.typeProperty(shopifyObj);
  product.short_description = await handlers.shortDescProperty(shopifyObj);
  product.attributes = await handlers.attProperty(shopifyObj);
  product.categories = await handlers.categoryProperty(shopifyObj);
  product.variations = await handlers.variProperty(shopifyObj);

  product = await handlers.stockProperties(product, shopifyObj);

  // Upload product to Hanabom
  const uploadRes = await uploadHanabom(product);

  // // Update Image of uploaded product -- it takes long (20 seconds)
  const pImages = await handlers.imageProperty(shopifyObj);
  const newProduct = await putHanabom(uploadRes.id, { images: pImages });
  console.log("image:", newProduct);

  // // Update Description with S3 Image URI
  const pDesc = await handlers.descProperty(newProduct.images);
  putHanabom(uploadRes.id, { description: pDesc });

  // Store on db
  const hanaID = uploadRes.id;
  const shopifyID = shopifyObj.id;
  const prodName = product.name;
  const sql = helpers.sql(hanaID, shopifyID, prodName);

  dbAction(sql, (results) => results);
  dbEnd();

  // Response
  const response = {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
  return response;
};
