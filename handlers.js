//TODO: sale price, unfinished functions, vendors

const { hanabomObj, attColour, attSize } = require("./hanabomObj");
const { getHanabom } = require("./hanabomAPI");

// Every function unneeded properties
const basicProperties = async (shopifyObj) => {
    hanabomObj.name = shopifyObj.title;
    hanabomObj.slug = shopifyObj.id.toString();
    hanabomObj.sku = shopifyObj.handle + Math.floor(Math.random() * 1000000000).toString(); 
    // hanabomObj.price = shopifyObj.price;
    // hanabomObj.regular_price = shopifyObj.price;
    //hanabomObj.sale_price = "";

    return hanabomObj
}

// If Option.lenght more than one, type is variable
const typeProperty = (shopifyObj) => {
    let output = "simple"
    
    if(shopifyObj.options.length != 0){
        let totalOptionLength = 0;
        shopifyObj.options.forEach((element) => {
            totalOptionLength += element.values.length
        });

        if(totalOptionLength > 1){
            output = "variable"
        }
    }
    
    return output;
}

// This may go into basicproperties() after validation
const shortDescProperty = (shopifyObj) => shopifyObj.body_html 

// Attributes 
const attProperty = (shopifyObj) => {
    let output = [];
    let id = 5;

    shopifyObj.options.forEach((option)=>{
        if(attColour.includes(option.name)){
            id = 3
        }else if(attSize.includes(option.name)){
            id = 2
        }

        output.push([{
            id: id,
            option:option.values
        }])
    });

   
    return output;
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
  