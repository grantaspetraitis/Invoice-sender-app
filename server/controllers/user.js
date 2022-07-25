const pool = require('../db').getPool();
const jwt = require('jsonwebtoken');
const sendMail = require('../send-mail');

exports.getHome = async (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      name: 'Invoice sender',
      version: '1.0'
    }
  })
}

exports.sendInvoice = async (req, res) => {
  const { email, name, month, title, template } = req.body;
  const emails = Object.values(email);
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
    if (err) throw err;
    const fullname = result[0].name;
    pool.query('SELECT * FROM user_details WHERE user_id = ?', [ID], (err, result2) => {
      if (err) throw err;
      if (result2.length > 0) {
        const { activity_name, bank, recipient_name, account_no, price, teacher_name, phone } = result2[0];
        if (emails.length > 0) {
          for (let i = 0; i < emails.length; i++) {
            sendMail({
              from: `"${fullname}" <dailesstudija5@gmail.com>`,
              to: `${emails[i]}`,
              subject: `${title}`,
              template: `${template}`,
              context: {
                name: name,
                month: month,
                activity_name: activity_name,
                bank: bank,
                recipient_name: recipient_name,
                account_no: account_no,
                price: price,
                teacher_name: teacher_name,
                phone: phone
              }
            })
          }
        } else {
          res.status(400).send({ error: 'Please select at least one recipient' })
        }
      } else {
        res.status(400).send({ error: 'Fill out your details at the "Account details page"' })
      }
    })
  })
}

exports.sendSingleInvoice = async (req, res) => {
  const { email, name, month, title, template } = req.body;
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
    if (err) throw err;
    const fullname = result[0].name;
    pool.query('SELECT * FROM user_details WHERE user_id = ?', [ID], (err, result2) => {
      if (err) throw err;
      const { activity_name, bank, recipient_name, account_no, price, teacher_name, phone } = result2[0];
      sendMail({
        from: `"${fullname}" <dailesstudija5@gmail.com>`,
        to: `${email}`,
        subject: `${title}`,
        template: `${template}`,
        context: {
          name: name,
          month: month,
          activity_name: activity_name,
          bank: bank,
          recipient_name: recipient_name,
          account_no: account_no,
          price: price,
          teacher_name: teacher_name,
          phone: phone
        }
      })
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
    if (err) throw err;
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

exports.addDetails = async (req, res) => {

  let token, decoded;

  try {
    token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: 'You must be logged in to view your profile' });
  }
  const ID = decoded.user.user_id;
  const { activity_title, bank, recipient_name, bank_account, price, teacher_name, phone } = req.body;

  pool.query('INSERT INTO user_details SET user_id = ?, activity_name = ?, bank = ?, recipient_name = ?, account_no = ?, price = ?, teacher_name = ?, phone = ?', [ID, activity_title, bank, recipient_name, bank_account, price, teacher_name, phone], (err, result) => {
    if (err) throw err;
    res.status(200).send({ success: true });
  })
}

exports.getDetails = async (req, res) => {
  let token, decoded;

  try {
    token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: 'You must be logged in to view your profile' });
  }
  const ID = decoded.user.user_id;

  pool.query('SELECT * FROM user_details WHERE user_id = ?', [ID], (err, result) => {
    if (err) throw err;
    res.status(200).send(result);
  })
}

exports.updateDetails = async (req, res) => {
  let token, decoded;

  try {
    token = req.headers.authorization.split(' ')[1];
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
    return res.status(401).send({ error: 'You must be logged in to view your profile' });
  }
  const ID = decoded.user.user_id;
  const { activity_name, bank, recipient_name, account_no, price, teacher_name, phone } = req.body;

  pool.query('UPDATE user_details SET activity_name = ?, bank = ?, recipient_name = ?, account_no = ?, price = ?, teacher_name = ?, phone = ? WHERE user_id = ?', [activity_name, bank, recipient_name, account_no, price, teacher_name, phone, ID], (err, result) => {
    if (err) throw err;
    res.status(200).send({ success: true })
  })
}