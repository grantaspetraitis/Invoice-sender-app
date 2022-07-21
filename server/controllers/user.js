const pool = require('../db').getPool();
const jwt = require('jsonwebtoken');
const sendMailMethod = require('../send-mail');

exports.getHome = async (req, res) => {

}

exports.sendMail = async (req, res) => {
    try {
      const result = await sendMailMethod(req.body);
  
      res.json({
        status: true,
        payload: result,
      });
    } catch (error) {
      console.error(error.message);
      res.json({
        status: false,
        payload: "Something went wrong in Sendmail Route.",
      });
    }
  };
  