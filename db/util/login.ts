import { pool } from "../dbController";

const login = async ({ email, password }: any) => {
  let con;
  console.log(email, password);
  try {
    con = await pool.getConnection();
    let checkExistence = await con.query(
      `SELECT * FROM users WHERE email="${email}"`
    );
    if (checkExistence.length == 0) {
      return {
        status: false,
        msg: "such email is not exist",
      };
    }
    console.log(checkExistence[0].password, password);

    if (checkExistence[0].password !== password) {
      return {
        status: false,
        msg: "email and password does not match",
      };
    }
    return {
      status: true,
      msg: "the email and password match",
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      msg: "error during authenticate login information",
    };
  }
};

export default login;
