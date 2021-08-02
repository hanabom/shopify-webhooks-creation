//TODO: sale price, unfinished functions

const { hanabomObj } = require("./hanabomObj");

const basicProperties = async (shopifyObj) => {
    hanabomObj.name = shopifyObj.title;
    hanabomObj.slug = shopifyObj.id;
    hanabomObj.sku = shopifyObj.sku;
    hanabomObj.price = shopifyObj.price;
    hanabomObj.regular_price = shopifyObj.price;
    //hanabomObj.sale_price = "";

    return hanabomObj
}

const typeProperty = (shopifyObj) => {
    console.log(shopifyObj);
    
    return "simple";
}

const descProperty = (shopifyObj) => {
    console.log(shopifyObj);

    return "";
}

const shortDescProperty = (shopifyObj) => {
    console.log(shopifyObj);

    return "";
} 

const attProperty = (shopifyObj) => {
    console.log(shopifyObj);

    return [];
}

const categoryProperty = (shopifyObj) => {
    console.log(shopifyObj);

    return [];
}

const imageProperty = (shopifyObj) => {
    console.log(shopifyObj);

    return [];
}

const variProperty = (shopifyObj) => {
    console.log(shopifyObj);

    return {};
}

const stockProperties = (product, shopifyObj) => {
    product.manage_stock = false;
    product.stock_quantity = 0;

    return product;
}

module.exports = { basicProperties, typeProperty, descProperty, shortDescProperty, 
            attProperty, stockProperties, categoryProperty, imageProperty, variProperty };
  