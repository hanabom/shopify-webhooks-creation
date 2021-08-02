const handlers = require("./handlers");
const { uploadHanabom, putHanabom } = require("./hanabomAPI");

exports.handler = (event) => {
    const shopifyObj = JSON.parse(event.body);

    // Initial product setup
    let product = handlers.basicProperties(shopifyObj);

    // Each Complex Properties setup
    product.type = handlers.typeProperty(shopifyObj);
    product.short_description = handlers.shortDescProperty(shopifyObj);
    product.attributes = handlers.attProperty(shopifyObj);
    product.categories = handlers.categoryProperty(shopifyObj);
    product.variations = handlers.variProperty(shopifyObj);

    product = handlers.stockProperties(product, shopifyObj);

    // Upload product to Hanabom
    const uploadRes = await uploadHanabom(product, "");
    console.log(uploadRes)
    
    // Update Image of uploaded product -- it takes long (20 seconds) 
    // product.images = handlers.imageProperty(product, shopifyObj);
    // const newProduct = await putHanabom(uploadRes.id, product[1]);

    // product = handlers.descProperty(product, shopifyObj);

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
