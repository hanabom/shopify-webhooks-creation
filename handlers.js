//TODO: sale price, unfinished functions, vendors

const { hanabomObj, attColour, attSize } = require("./hanabomObj");
const { categoryIdFinder } = require("./category");
// const { getHanabom, uploadTag } = require("./hanabomAPI");

// Every function unneeded properties
const basicProperties = async (shopifyObj) => {
  hanabomObj.name = shopifyObj.title + "_" + shopifyObj.vendor;
  hanabomObj.slug = shopifyObj.id.toString();
  hanabomObj.sku =
    shopifyObj.handle + Math.floor(Math.random() * 1000000000).toString();

  // const tagArray = shopifyObj.tags.split(",");
  // const tagsObjArray = tagArray.map((tag) => await uploadTag(tag));
  // console.log("tagsObjArray:", tagsObjArray);

  return hanabomObj;
};

// If Option.lenght more than one, type is variable
const typeProperty = (shopifyObj) => {
  let output = "simple";

  if (shopifyObj.options.length != 0) {
    let totalOptionLength = 0;
    shopifyObj.options.forEach((element) => {
      totalOptionLength += element.values.length;
    });

    if (totalOptionLength > 1) {
      output = "variable";
    }
  }

  return output;
};

// This may go into basicproperties() after validation
const shortDescProperty = (shopifyObj) => shopifyObj.body_html;

// Attributes
const attProperty = (shopifyObj) => {
  let output = [];
  let id = 5;

  shopifyObj.options.forEach((option) => {
    if (attColour.includes(option.name)) {
      id = 3;
    } else if (attSize.includes(option.name)) {
      id = 2;
    }

    output.push({
      id: id,
      visible: true,
      variation: true,
      options: option.values,
    });
  });

  return output;
};

const categoryProperty = (shopifyObj) => {
  const result = [];
  const collection = shopifyObj.product_type;
  const categoryData = categoryIdFinder(collection);
  categoryData.forEach((category) => result.push({ id: category.id }));
  return result;
};

const imageProperty = (shopifyObj) => {
  let output = [];

  shopifyObj.images.forEach((element) => {
    output.push({ src: "https:" + element.src.replace(/\\/g, "") });
  });

  return output;
};

const descProperty = (images) => {
  let output = "";

  // images?.forEach((element) => {
  //   output += `<img class="size-medium aligncenter" src="${element.src}" alt="" width="300" height="300" /><br />\n`;
  // });

  return output;
};

module.exports = {
  basicProperties,
  typeProperty,
  descProperty,
  shortDescProperty,
  attProperty,
  categoryProperty,
  imageProperty,
};

// 회사 코드
// export const loadTable = (tableType, tableName) => (dispatch, getState) => {
//   const tables = getState().tables;
//   const table = _.get(tables, [tableType, tableName]);
//   if (table) {
//     return Promise.resolve(table);
//   }
//   return fetchTable(tableType, tableName)
//     .then((data) =>
//       dispatch({
//         type: "SET_TABLE",
//         payload: { tableType, tableName, data },
//       })
//     )
//     .catch((e) => message.error(e.message));
// };

// export const loadTables = (layers) => (dispatch) => {
//   const filtered = _.uniqBy(
//     _.filter(layers, (l) => l.tableType !== "db").map((l) =>
//       _.pick(l, ["tableType", "tableName"])
//     ),
//     (l) => l.tableName
//   );
//   return Promise.all(
//     filtered.map((layer) => {
//       const { tableType, tableName } = layer;
//       return dispatch(loadTable(tableType, tableName));
//     })
//   );
// };
