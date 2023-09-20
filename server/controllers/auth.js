const connectDb = require("../db");

const login = async (req, res) => {
  try {
    const { email, userPassword } = req.body;
    const [results, fields] = await connectDb
      .promise()
      .query(`SELECT userID from users where email = '${email}' limit 1`);
    if (results) {
      const userData = await connectDb
        .promise()
        .query(`SELECT *  from users where email = '${email}'`);
      const { type_id, userID, password } = userData[0][0];

      if (userPassword == password) {
        res.json({
          msg: "LOgin success",
          type_id: type_id,
          userID: userID,
        });
      } else {
        res.json({
          msg: "Incorrect credentials",
        });
      }
    } else {
      res.json({
        msg: "User does not exist",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = req.params;
    await connectDb
      .promise()
      .query(`INSERT INTO login (username) values ('${email}')`);
    res.json({
      email: email,
      password: password,
      msg: "Success",
    });
  } catch (err) {
    console.log(err);
    res.json({
      error: err,
    });
  }
};

const getValues = async (req, res) => {
  try {
    const { table } = req.params;
    const [results, fields] = await connectDb
      .promise()
      .execute(`SELECT * from ${table}`);

    res.json({
      results: results,
    });
  } catch (err) {
    res.json(err);
  }
};

const deleteValues = async (req, res) => {
  try {
    const { table, id } = req.params;
    await connectDb
      .promise()
      .execute(`DELETE from ${table} where id = ?`, [id]);

    res.json({
      msg: "Operation successfull",
    });
  } catch (err) {
    res.json(err);
  }
};

const updateValues = async (req, res) => {
  try {
    const { table, id, field, newValue } = req.params;
    await connectDb
      .promise()
      .execute(`UPDATE ? SET ? = ? where id = ?`, [table, field, newValue, id]);

    res.json({
      msg: "Operation successfull",
    });
  } catch (err) {
    res.json(err);
  }
};

module.exports = { login, signup, getValues, deleteValues, updateValues };
