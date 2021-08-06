const sql = (hanaID, shopifyID, prodName) =>
  'INSERT INTO products (hanaId, wixId, name) VALUES ("' +
  hanaID +
  '", "' +
  shopifyID +
  '", "' +
  prodName +
  '");';

module.exports = { sql };
