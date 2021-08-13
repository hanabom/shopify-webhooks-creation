const { attColour, attSize } = require("./hanabomObj");
const { uploadHanabom, putHanabom } = require("./hanabomAPI");

const variantProperty = async (shopifyObj, productId) => {
  const { variants, options } = shopifyObj;

  if (variants.length <= 1) {
    // When product has no variant

    const inputObj = {
      price: variants[0].price,
      regular_price: variants[0].price,
      stock_quantity: variants[0].inventory_quantity,
      manage_stock: variants[0].stock_quantity ? true : false,
    };

    await putHanabom(productId, inputObj);
  } else {
    // When product has variant

    variants.map(async (variant) => {
      const variantObj = {
        price: "",
        regular_price: "",
        sale_price: "",
        stock_quantity: null,
        manage_stock: false,
        attributes: [],
      };

      // variantObj.sku = variant.sku;
      variantObj.price = variant.price;
      variantObj.regular_price = variant.price;
      variantObj.stock_quantity = variant.inventory_quantity;

      // TODO: if vendor didn't put quanity or 0, we will screw
      variantObj.manage_stock = variant.stock_quantity ? true : false;

      options.forEach((option, i) => {
        if (attColour.includes(option.name)) {
          const variantOpt = `option${i + 1}`;
          const obj = {
            id: 3,
            option: variant[variantOpt],
          };

          variantObj.attributes.push(obj);
        } else if (attSize.includes(option.name)) {
          const variantOpt = `option${i + 1}`;
          const obj = {
            id: 2,
            option: variant[variantOpt],
          };

          variantObj.attributes.push(obj);
        }
      });

      await uploadHanabom(variantObj, `${productId}/variations`);
    });
  }
};

module.exports = { variantProperty };
