const handlers = require("./handlers");
const { uploadHanabom, putHanabom } = require("./hanabomAPI");

exports.handler = async (event) => {
    const shopifyObj = JSON.parse(event.body);
    // const vendor = event.headers.x-shopify-shop-domain;
    // console.log(vendor);

    // Initial product setup
    let product = handlers.basicProperties(shopifyObj);

    // Each Complex Properties setup
    product.type = await handlers.typeProperty(shopifyObj);
    product.short_description = await handlers.shortDescProperty(shopifyObj);
    product.attributes = await handlers.attProperty(shopifyObj);
    product.categories = await handlers.categoryProperty(shopifyObj);
    product.variations = await handlers.variProperty(shopifyObj); 

    product = await handlers.stockProperties(product, shopifyObj);

    // Upload product to Hanabom
    const uploadRes = await uploadHanabom(product);

    // Update Image of uploaded product -- it takes long (20 seconds) 
    const pImages = await handlers.imageProperty(shopifyObj);
    const newProduct = await putHanabom(uploadRes.id, {images: pImages});

    // Update Description with S3 Image URI
    const pDesc = await handlers.descProperty(newProduct.images);
    putHanabom(uploadRes.id, {description: pDesc});

    // Response
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
