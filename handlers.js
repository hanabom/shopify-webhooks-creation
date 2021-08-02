//TODO: sale price, unfinished functions, vendors

const { hanabomObj } = require("./hanabomObj");

const basicProperties = async (shopifyObj) => {
    hanabomObj.name = shopifyObj.title;
    hanabomObj.slug = shopifyObj.id.toString();
    hanabomObj.sku = shopifyObj.handle + Math.floor(Math.random() * 1000000000).toString(); 
    // hanabomObj.price = shopifyObj.price;
    // hanabomObj.regular_price = shopifyObj.price;
    //hanabomObj.sale_price = "";

    return hanabomObj
}

const typeProperty = (shopifyObj) => {
    
    
    return "simple";
}

const shortDescProperty = (shopifyObj) => {
    

    return "";
} 

const attProperty = (shopifyObj) => {
    

    return [];
}

const categoryProperty = (shopifyObj) => {
    

    return [];
}

const variProperty = (shopifyObj) => {
    

    return {};
}

const imageProperty = (shopifyObj) => {
    let output = [];
    
    shopifyObj.images.forEach(element => {
        output.push({src: "https:" + element.src.replace(/\\/g,"")});
    });
    
    return output;
}

const descProperty = (images) => {
    let output = "";

    images.forEach((element) => {
        output += `<img class="size-medium aligncenter" src="${element.src}" alt="" width="300" height="300" /><br />\n`
    });

    return output;
}


const stockProperties = (product, shopifyObj) => {
    product.manage_stock = false;
    product.stock_quantity = 0;

    return product;
}

module.exports = { basicProperties, typeProperty, descProperty, shortDescProperty, 
            attProperty, stockProperties, categoryProperty, imageProperty, variProperty };
  