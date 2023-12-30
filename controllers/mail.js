'use strict'

const Mailjet = require('node-mailjet');

function sendForgotPasswordEmail(user, host, resetLink) {
    const mailjet = Mailjet.apiConnect(
        process.env.MJ_APIKEY_PUBLIC,
        process.env.MJ_APIKEY_PRIVATE,
    );

    const request = mailjet
        .post('send', { version: 'v3.1' })
        .request({
        Messages: [
            {
                From: {
                    Email: "duongphannamhung@gmail.com",
                    Name: "EShop"
                },
                To: [
                        {
                            Email: user.email,
                            Name: `${user.firstName} ${user.lastName}`
                        }
                ],
                Subject: "[Eshop] Reset Password",
                HTMLPart: 
                `<p>Hi ${user.firstName} ${user.lastName}, </p>
                <br/>
                <p>There was a request to change your password!</p>
                <br/>            
                <p>If you did not make this request then please ignore this email.</p>
                <br/>
                <p>Otherwise, please click this link to change your password:</p>
                <br/>
                <a href="${resetLink}">Reset Password</a>
                <br/>
                <br/>
                <p>Best Regards,</p>
                Eshop`
            }
        ]
    })

    return request;
}

module.exports = {
    sendForgotPasswordEmail
}