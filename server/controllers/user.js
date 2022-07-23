const pool = require('../db').getPool();
const jwt = require('jsonwebtoken');
const sendMail = require('../send-mail');

exports.getHome = async (req, res) => {

}

exports.sendInvoice = async (req, res) => {
  const { email, name, month } = req.body;
  sendMail({
    from: '"Benjaminas Ančeris" <grantas157@gmail.com>',
    to: `<${email}>`,
    subject: 'Sąskaita už Dailės būrelį',
    template: 'invoice',
    context: {
      name: name,
      month: month
    }
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

  pool.query('SELECT contact_name, contact_email FROM contacts WHERE user_id = ?', [ID], (err, result) => {
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

  console.log(trimmedEmails, trimmedNames)
  const query = 'INSERT INTO contacts SET contact_email = ?, contact_name = ?, user_id = ?';

  for (let i = 0; i < trimmedEmails.length; i++) {
    pool.query(query, [trimmedEmails[i], trimmedNames[i], ID], (err, result) => {
      if (err) throw err;
    })
  }
  res.status(200).send({ success: true })
}