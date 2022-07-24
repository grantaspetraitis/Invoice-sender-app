const pool = require('../db').getPool();
const jwt = require('jsonwebtoken');
const sendMail = require('../send-mail');

exports.getHome = async (req, res) => {

}

exports.sendInvoice = async (req, res) => {
  const { email, name, month, title } = req.body;
  const emails = Object.values(email);
  const names = Object.keys(email);
  let token, decoded;

  try {
    token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: 'You must be logged in to view your profile' });
  }

  const ID = decoded.user.user_id;

  pool.query('SELECT users.name FROM users WHERE user_id = ?', [ID], (err, result) => {
    if(err) throw err;
    const fullname = result[0].name;
    sendMail({
      from:`"${fullname}" <dailesstudija5@gmail.com>`,
      to: `${emails}`,
      subject: `${title}`,
      template: 'invoice',
      context: {
        name: name,
        month: month
      }
    })
  })
}

exports.sendSingleInvoice = async (req, res) => {
  const { email, name, month, title } = req.body;
  let token, decoded;

  try {
    token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: 'You must be logged in to view your profile' });
  }

  const ID = decoded.user.user_id;

  pool.query('SELECT users.name FROM users WHERE user_id = ?', [ID], (err, result) => {
    if(err) throw err;
    const fullname = result[0].name;
    sendMail({
      from:`"${fullname}" <dailesstudija5@gmail.com>`,
      to: `${email}`,
      subject: `${title}`,
      template: 'invoice',
      context: {
        name: name,
        month: month
      }
    })
  })
}

exports.getProfile = async (req, res) => {
  let token, decoded;

  try {
    token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: 'You must be logged in to view your profile' });
  }

  const ID = decoded.user.user_id;

  pool.query('SELECT contact_name, contact_email, contact_id FROM contacts WHERE user_id = ?', [ID], (err, result) => {
    if(err) throw err;
    res.status(200).send(result);
  })
}

exports.addContact = async (req, res) => {

  let token, decoded;

  try {
    token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: 'You must be logged in to view your profile' });
  }

  const ID = decoded.user.user_id;
  const { email, body } = req.body;
  const emailArray = [email];
  const emails = emailArray.map(email => email.split(','));
  const nameArray = [body];
  const names = nameArray.map(name => name.split(','));
  const trimmedEmails = emails[0].map(email => email.trim());
  const trimmedNames = names[0].map(name => name.trim());

  const query = 'INSERT INTO contacts SET contact_email = ?, contact_name = ?, user_id = ?';

  for (let i = 0; i < trimmedEmails.length; i++) {
    pool.query(query, [trimmedEmails[i], trimmedNames[i], ID], (err, result) => {
      if (err) throw err;
    })
  }
  res.status(200).send({ success: true })
}