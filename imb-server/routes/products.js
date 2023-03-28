//Import required libraries
const express = require('express');
const router = express.Router();
const fs = require('fs');
const jsonFilePath = './models/products.json';

//Define Product schema in swagger components
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - productName
 *         - productOwnerName
 *         - Developers
 *         - scrumMasterName
 *         - startDate
 *         - methodology
 *       properties:
 *         productId:
 *           type: string
 *           description: The auto-generated id of the product
 *         productName:
 *           type: string
 *           description: Product name
 *           required: true
 *         productOwnerName:
 *           type: string
 *           description: Product owner name
 *           required: true
 *         Developers:
 *           type: array
 *           description: The developers name list who are working on the product(up to 5)
 *           items:
 *             type: string
 *             description: Developer name
 *             required: true
 *           maxItems: 5
 *         scrumMasterName:
 *           type: string
 *           description: Scrum master name
 *           required: true
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of working on the product
 *           required: true
 *         methodology:
 *           type: string
 *           description: Methodology method used for product(Agile or Waterfall)
 *           required: true
 *       example:
 *         productName: "Product Name"
 *         productOwnerName: "John Doe"
 *         Developers: ["Jane Donas", "Max Jonas"]
 *         scrumMasterName: "Alice Smith"
 *         startDate: "2022/01/01"
 *         methodology: "Agile"
 */

// Fetch the list of all products
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Fetch the list of all products
 *     description: Fetches the list of all products from a JSON file and returns it.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of all products
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *       400:
 *         description: Failed to fetch the list of all products
 */
router.get('/products', (req, res, next) => {
  try {
    fs.readFile(jsonFilePath, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const products = JSON.parse(data);
      res.status(200).json(products);
    });
  } catch (error) {
    console.error(error);
    res.status(400).json('Failed to fetch the list of all products');
  }
});

//--Format date--
const formatDate = (date) => {
  date = new Date(date);
  const day = date.getUTCDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDate =
    year +
    '/' +
    (month < 10 ? '0' : '') +
    month +
    '/' +
    (day < 10 ? '0' : '') +
    day;

  return formattedDate;
};
//--end of format date--

//Add the new product
/**
 * @swagger
 * /product:
 *   post:
 *     summary: Add a new product to the list of products
 *     description: Adds a new product to the list of products with the given product details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Successfully added the new product
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '400':
 *         description: Failed to add the new product
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 */
router.post('/product', (req, res, next) => {
  try {
    var newProduct = req.body;
    const formattedDate = formatDate(newProduct.startDate);
    newProduct.startDate = formattedDate;

    // console.log(newProduct);

    let callback = function (err) {
      if (err) throw err;
      console.log('File Saved and Successfully added the new product');
      res.status(200).json('Successfully added the new product');
    };

    fs.readFile(jsonFilePath, (err, data) => {
      if (err) {
        console.error(err);
      } else {
        var json = JSON.parse(data);
        const id = JSON.stringify(json.length + 1);
        newProduct = { productId: id, ...newProduct };
        json.push(newProduct);
        fs.writeFile(jsonFilePath, JSON.stringify(json), callback);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(400).json('Failed to add the new product');
  }
});

//Update the product info with productId
/**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Update product information by productId
 *     description: Update product information using product Id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id of the product to update
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: Product with productId updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       '404':
 *         description: Product with productId not found
 *       '500':
 *         description: Error updating product
 */
router.put('/product/:id', (req, res, next) => {
  // try {
  const id = req.params.id;
  const updateProduct = req.body;

  try {
    const data = fs.readFileSync(jsonFilePath);
    const json = JSON.parse(data);
    const pIdx = json.findIndex((product) => {
      return product.productId === id;
    });
    if (pIdx !== -1) {
      json[pIdx] = { ...json[pIdx], ...updateProduct };
      fs.writeFileSync(jsonFilePath, JSON.stringify(json));
      console.log(
        `File Saved and Product with productId ${id} updated successfully`
      );
      res.status(200).send(`Product with productId ${id} updated successfully`);
    } else {
      console.error(`Product with productId ${id} not found`);
      res.status(404).send(`Product with productId ${id} not found`);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating product');
  }
});

module.exports = router;
