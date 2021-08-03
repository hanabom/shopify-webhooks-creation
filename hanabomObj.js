const attColour = ["color","colour","Color","Colour","COLOR","COLOUR","colors","colours","Colors","Colours","COLORS","COLOURS","Title"];
const attSize = ["size", "Size", "SIZE"];

let hanabomObj = {
  name: "TestingName",
  slug: "TestingName-20210711",
  type: "simple",
  status: "private",
  featured: false,
  catalog_visibility: "visible",
  description: "",
  short_description: "",
  sku: "sdadw20210711",
  price: "9999",
  regular_price: "9999",
  sale_price: "",
  date_created: "", //"2021-07-11T23:30:31", //Need
  date_created_gmt: "", // "2021-07-12T06:30:31", //Need
  date_modified: "", //Need
  date_modified_gmt: "", //Need
  date_on_sale_from: "", //Need
  date_on_sale_from_gmt: "", //Need
  date_on_sale_to: "", //Need
  date_on_sale_to_gmt: "", //Need
  on_sale: false,
  purchasable: true,
  total_sales: 0,
  virtual: false,
  downloadable: false,
  download_limit: "-1",
  download_expiry: "-1",
  external_url: "",
  button_text: "",
  tax_status: "taxable",
  tax_class: "",
  manage_stock: false,
  stock_quantity: null, //Need
  in_stock: true,
  backorders: "no",
  backorders_allowed: false,
  backordered: false,
  sold_individually: false, // Please investigate
  weight: "",
  shipping_required: true,
  shipping_taxable: true,
  shipping_class: "",
  shipping_class_id: "0",
  reviews_allowed: true,
  average_rating: "0.00",
  rating_count: "0",
  parent_id: "0",
  purchase_note: "",
  categories: [], //Need
  images: [],
  attributes: [], 
  menu_order: "0",
  stock_status: "",
};

module.exports = { hanabomObj, attColour, attSize };