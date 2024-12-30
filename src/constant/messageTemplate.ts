export const OTP_VERIFICATION_TEMPLATE = (otp: string) => {
  return `<p> 
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Verify Your OTP</title>
        <meta name="description" content="">
        <meta name="author" content="">
        <meta name="keywords" content="">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <link rel="icon" href="images/favicon.png" sizes="32x32" type="image/png"> 
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;400;500;600;700;800&display=swap" rel="stylesheet">
        <style>
            *{
                font-family: 'Inter', sans-serif;
            }
        </style>
    </head>
        <body>  
                <div style="background:#fff;max-width:700px;border-radius:20px;text-align:center;padding: 50px 20px 20px;margin: 0 auto;width: 100%;margin-top: 80px;border:2px solid #888888;border-bottom: solid 10px #888888;">
                <table width="100%" style="background:#fff;max-width:700px;text-align:center;width: 100%;margin: 0 auto;">
                    <tbody>
                      <tr> <td> &nbsp; </td> </tr>
                        <tr>
                            <td style="margin:20px 0 10px;">
                            <div style="font-size:28px;font-weight:600;padding-bottom:10px;"> 
                             <p style="margin:10px">Here is your One Time Password</p>
                             <p style="margin:10px;color:blue;">${otp}</p>
                             <p style="font-size:20px;color:red;">valid for next 5 minutes only</p>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
         </body>
    </html><p>`;
};
