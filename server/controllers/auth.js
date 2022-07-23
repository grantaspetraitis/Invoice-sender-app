const pool = require('../db').getPool();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../send-mail');
const crypto = require('crypto');

exports.registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;
    const registerDate = new Date();
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    // const verifyToken = jwt.sign({ user: username }, process.env.JWT_SECRET, {
    //     expiresIn: '60s'
    // });
    const verifyToken = crypto.randomBytes(128).toString('hex');
    const verifyUrl = `http://localhost:3001/verify/${verifyToken}`
    const timestamp = registerDate.getTime();
    const tokenExpiration = new Date(timestamp + 15 * 60 * 1000);
    // const tokenExpiration = new Date(tokenExpirationStamp);

    pool.query('SELECT email FROM users WHERE email = ? OR username = ?', [email, username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) return res.status(400).send({ error: 'User already exists' });

        pool.query('INSERT INTO users SET name = ?, email = ?, username = ?, password = ?, register_date = ?, verifyToken = ?, tokenExpiration = ?', [name, email, username, hashedPass, registerDate, verifyToken, tokenExpiration], (err, result) => {
            if (err) throw err;
            res.status(200).send({ success: true })
        })
        sendEmail({
            from: '"InvoiceSender" <grantas157@gmail.com>',
            to: name + ' ' + `<${email}>`,
            subject: 'Verify your email address',
            text: `Click this link to verify your email address: ${verifyUrl}`,
            template: 'verifyTemplate',
            context: {
                username: username,
                verifyUrl: verifyUrl
            }
        })
    })
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    pool.query('SELECT user_id FROM users WHERE email = ?', [email], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user_id = result[0].user_id;
            pool.query('SELECT * FROM users WHERE user_id = ? AND isActive = ?', [user_id, 1], async (err, result2) => {
                if (err) throw err;
                if (result2.length > 0) {
                    const user = result2[0];
                    const hashedPass = user.password;
                    const isPasswordCorrect = await bcrypt.compare(password, hashedPass);
                    if (!isPasswordCorrect) return res.status(400).send({ error: 'Incorrect credentials' });

                    const token = jwt.sign({ user }, process.env.JWT_SECRET);
                    res.status(200).send({ token: token, username: user.username, id: user.user_id, role: user.role });
                } else {
                    res.status(400).send({ error: 'Please verify your email address' })
                }
            })
        } else {
            res.status(400).send({ error: 'User does not exist' })
        }
    })
}

exports.verifyUserEmail = async (req, res) => {
    const verifyToken = req.params.token;
    const currentDate = (new Date()).getTime();
    if (verifyToken !== 0) {
        pool.query('SELECT user_id, tokenExpiration FROM users WHERE verifyToken = ?', [verifyToken], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                const user_id = result[0].user_id;
                const expiration = (result[0].tokenExpiration).getTime();
                if (expiration > currentDate) {
                    pool.query('UPDATE users SET isActive = ?, verifyToken = ? WHERE user_id = ?', [true, null, user_id], (err, result2) => {
                        if (err) throw err;
                        res.status(200).send({ success: true })
                    })
                } else {
                    res.status(400).send({ error: 'Link expired' });
                }
            } else {
                res.status(401).send({ error: 'Invalid link' })
            }
        })
    } else {
        res.status(401).send({ error: 'Invalid link' });
    }
}