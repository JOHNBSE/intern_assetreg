const { query } = require("express");
const connectDb = require("../db");

const viewAssets = async (req, res) => {
  try {
    const [results, fields] = await connectDb
      .promise()
      .execute(`SELECT * from full_asset_information`);

    res.json({
      results: results,
    });
  } catch (err) {
    res.send(err);
  }
};

const addAssets = async (req, res) => {
  try {
    const {
      assetID,
      assetName,
      serial_no,
      locationID,
      status,
      model,
      categoryID,
    } = req.body;
    await connectDb
      .promise()
      .query(
        `insert into asset_information values ('${assetID}', '${assetName}','${serial_no}', '${locationID}','${status}', '${model}', '${categoryID}')`
      );
    res.json({
      msg: "Success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
};

const makeRequests = async (req, res) => {
  try {
    const { title, service_required, userID, timeout } = req.body;
    await connectDb
      .promise()
      .query(
        `INSERT INTO requests (title, service_required, userID, status, timeout) values ('${title}', '${service_required}', '${userID}', "Pending", '${timeout}')`
      );
    res.json({
      msg: "Success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
};

const search = async (req, res) => {
  try {
    const { searchValue, searchType } = req.params;
    let query = `SELECT * from full_asset_information where category_name like '%${searchValue}%'`;
    let query2 = `SELECT * from full_asset_information where serial_no like '%${searchValue}%'`;
    let searchResults;
    if (searchType === "category") {
      searchResults = await connectDb.promise().query(query);
    } else if (searchType === "serial_no") {
      searchResults = await connectDb.promise().query(query2);
    }

    res.json({
      results: searchResults[0],
    });
  } catch (err) {
    res.send(err);
  }
};

const updateRequests = async (req, res) => {
  try {
    const { requestID } = req.body;
    await connectDb
      .promise()
      .query(
        `UPDATE requests SET status = "Closed" WHERE requestID = '${requestID}'`
      );
    res.json({
      msg: "Success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
};

const viewRequests = async (req, res) => {
  try {
    const requests = await connectDb
      .promise()
      .query(`SELECT * FROM full_requests`);
    const closedRequests = requests[0].filter(
      (request) => request.status === "Closed"
    );
    const openRequests = requests[0].filter(
      (request) => request.status === "Pending"
    );
    res.json({
      openRequests: openRequests,
      closedRequests: closedRequests,
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
};

const getTotal = async (req, res) => {
  try {
    const getAllItems = async (colname, table_name) => {
      return await connectDb
        .promise()
        .query(`select count(${colname}) as count from ${table_name};`);
    };
    let assets = await getAllItems("assetID", "asset_information");
    let categories = await getAllItems("categoryID", "asset_category");
    let locations = await getAllItems("locationID", "location");
    let consumables = await getAllItems("consumableID", "consumables");
    let requests = await getAllItems("requestID", "requests");

    res.json({
      assets: assets[0][0].count,
      categories: categories[0][0].count,
      locations: locations[0][0].count,
      consumables: consumables[0][0].count,
      requests: requests[0][0].count,
    });
  } catch (err) {
    console.error("Error in getting total");
  }
};

const viewLocations = async (req, res) => {
  try {
    const [results, fields] = await connectDb.promise()
      .execute(`SELECT l.location_name, l.room_no, d.department_name 
               from location as l join department as d
               where l.departmentID = d.departmentID
      `);
    res.json({
      results: results,
    });
  } catch (err) {
    res.send(err);
  }
};

const viewCategories = async (req, res) => {
  try {
    const [results, fields] = await connectDb.promise()
      .execute(`SELECT * from asset_category
      `);
    res.json({
      results: results,
    });
  } catch (err) {
    res.send(err);
  }
};


const viewConsumables = async (req, res) => {
  try {
    const [results, fields] = await connectDb.promise().execute(`
      SELECT 
    co.name, co.quantity, co.purchase_date, ca.category_name
      FROM
    consumables AS co
        JOIN
    asset_category AS ca ON co.categoryID = ca.categoryID;
      `);
    res.json({
      results: results,
    });
  } catch (err) {
    res.send(err);
  }
};
module.exports = {
  viewAssets,
  addAssets,
  makeRequests,
  updateRequests,
  search,
  viewRequests,
  getTotal,
  viewLocations,
  viewCategories,
  viewConsumables,
};
