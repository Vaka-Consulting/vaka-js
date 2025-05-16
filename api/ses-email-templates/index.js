/**
 * @param {Object} serverless - Serverless instance
 * @param {Object} options - runtime options
 * @returns {Promise<{name: string, subject: string, html: string, text}[]>}
 */
const templateConfiguration = async (serverless, options) => {
    return [{
    name: `${serverless.service.getServiceName()}-verify-email`,
    subject: 'Confirmation Code',
    html: `
    <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            }

            .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            }

            h1 {
            font-size: 28px;
            color: #333;
            margin-bottom: 20px;
            }

            p {
            font-size: 18px;
            color: #666;
            margin-bottom: 30px;
            }

            .otp-code-container {
            display: flex;
            justify-content: center;
            }

            .otp-code-box {
            width: 50px;
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
            line-height: 50px;
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            }

            .time-limit {
            font-size: 16px;
            color: #888;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Your Email Confirmation</h1>
            <p>To verify your email please click <a href="{{link}}">here</a> or Copy and Paste below link to your browser </p>
            {{link}}
            </div>
            <div class="time-limit">This code is valid for 5 minutes.</div>
        </div>
        </body>
        </html>
    `,
    text: 'Email Confirmation : {{link}} ',
},
{
    name: `${serverless.service.getServiceName()}-verify-code`,
    subject: 'Confirmation Code',
    html: `
    <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
        <style>
            body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            }

            .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
            }

            h1 {
            font-size: 28px;
            color: #333;
            margin-bottom: 20px;
            }

            p {
            font-size: 18px;
            color: #666;
            margin-bottom: 30px;
            }

            .otp-code-container {
            display: flex;
            justify-content: center;
            }

            .otp-code-box {
            width: 50px;
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 5px;
            text-align: center;
            line-height: 50px;
            font-size: 24px;
            font-weight: bold;
            color: #007bff;
            }

            .time-limit {
            font-size: 16px;
            color: #888;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Your Confirmation Code</h1>
            <p>We're excited to have you back!</p>
            <p>To verify your account, please enter the following code into our verification form: </p>            
            <div class="otp-code-container">
            <div class="otp-code-box">{{code.[0]}}</div>
            <div class="otp-code-box">{{code.[1]}}</div>
            <div class="otp-code-box">{{code.[2]}}</div>
            <div class="otp-code-box">{{code.[3]}}</div>
            <div class="otp-code-box">{{code.[4]}}</div>
            <div class="otp-code-box">{{code.[5]}}</div>
            </div>
            <div class="time-limit">This code is valid for 5 minutes.</div>
        </div>
        </body>
        </html>
    `,
    text: 'Confirmation Code: {{code.[0]}}{{code.[1]}}{{code.[2]}}{{code.[3]}}{{code.[4]}}{{code.[5]}} ',
}
]
}

export default templateConfiguration