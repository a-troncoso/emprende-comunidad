'use strict'

const functions = require('firebase-functions')
const nodemailer = require('nodemailer')
// Configure the email transport using the default SMTP transport and a GMail account.
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email
const gmailPassword = functions.config().gmail.password
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
})

// Sends an email confirmation when a user changes his mailing list subscription.
exports.sendEmailWelcomeSelleVisitor = functions.database.ref('/users/{uid}').onWrite(event => {
  const snapshot = event.data
  const val = snapshot.val()

  // Si no se cambió el attr profile
  // o el valor de profile es distinto de 2 (seller-visitor)
  // no sigue la ejecución
  if (!snapshot.changed('profile') || val.profile !== 2) {
    return null
  }

  const mailOptions = {
    from: '"Emprende Comunidad" <emprendecomunidad@gmail.com>',
    to: val.email
  }

  // Building Email message.
  mailOptions.subject = 'Bienvenido vendedor visitante'
  mailOptions.html = '<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title></title><!--[if !mso]><!-- --><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass *{line-height:100%}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic}p{display:block;margin:13px 0}</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px){@-ms-viewport{width:320px}@viewport{width:320px}}</style><!--<![endif]--><!--[if mso]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--><!--[if lte mso 11]> <style type="text/css"> .outlook-group-fix { width:100% !important; } </style> <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px){.mj-column-per-100{width:100%!important}}</style></head><body><div class="mj-container"><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center" style="width:600px;"> <tr> <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"> <![endif]--><div style="margin:0 auto;max-width:600px"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:0;width:100%" align="center" border="0"><tbody><tr><td style="text-align:center;vertical-align:top;direction:ltr;font-size:0;padding:20px 0"><!--[if mso | IE]> <table role="presentation" border="0" cellpadding="0" cellspacing="0"> <tr> <td style="vertical-align:top;width:600px;"> <![endif]--><div class="mj-column-per-100 outlook-group-fix" style="vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100%"><table role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0"><tbody><tr><td style="word-wrap:break-word;font-size:0;padding:10px 25px" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-spacing:0" align="center" border="0"><tbody><tr><td style="width:100px"><img alt="" height="auto" src="https://firebasestorage.googleapis.com/v0/b/emprende-comunid-1509237222922.appspot.com/o/app%2Fcommunity-logo.jpg?alt=media&token=3adc3382-7cf3-4b08-8cd6-db0b9be53184" style="border:none;border-radius:0;display:block;font-size:13px;outline:0;text-decoration:none;width:100%;height:auto" width="100"></td></tr></tbody></table></td></tr><tr><td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-bottom:30px"><p style="font-size:1px;margin:0 auto;border-top:4px solid #6da71b;width:100%"></p><!--[if mso | IE]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="font-size:1px;margin:0px auto;border-top:4px solid #6da71b;width:100%;" width="600"><tr><td style="height:0;line-height:0;"> </td></tr></table><![endif]--></td></tr><tr><td style="word-wrap:break-word;font-size:0;padding:10px 25px" align="center"><div style="cursor:auto;color:grey;font-family:helvetica;font-size:24px;line-height:22px;text-align:center">¡Bienvenido vendedor de visita!</div></td></tr><tr><td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-top:30px" align="center"><div style="cursor:auto;color:grey;font-family:helvetica;font-size:22px;line-height:22px;text-align:center">Ya eres parte de Emprende Comunidad</div></td></tr><tr><td style="word-wrap:break-word;font-size:0;padding:10px 25px" align="center"><div style="cursor:auto;color:grey;font-family:helvetica;font-size:20px;line-height:22px;text-align:center">Tu producto estará activo hasta que cierres la aplicación, <b>si quieres subir más productos y acceder a más opciones</b> crea una cuenta accediento a la aplicación.</div></td></tr><tr><td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-top:40px" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate" align="center" border="0"><tbody><tr><td style="border:none;border-radius:3px;color:#fff;cursor:auto;padding:10px 25px" align="center" valign="middle" bgcolor="8ad322"><a href="https://0.0.0.0:8080/seller-visitor/map?key='+snapshot.key+'" style="text-decoration:none;background:8ad322;color:#fff;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:120%;text-transform:none;margin:0" target="_blank">¡ Ir a la aplicación ! (local)</a></td></tr></tbody></table></td></tr><tr><td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-top:40px" align="center"><table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:separate" align="center" border="0"><tbody><tr><td style="border:none;border-radius:3px;color:#fff;cursor:auto;padding:10px 25px" align="center" valign="middle" bgcolor="8ad322"><a href="https://emprende-comunid-1509237222922.firebaseapp.com/seller-visitor/map?key='+snapshot.key+'" style="text-decoration:none;background:8ad322;color:#fff;font-family:Ubuntu,Helvetica,Arial,sans-serif;font-size:16px;font-weight:400;line-height:120%;text-transform:none;margin:0" target="_blank">¡ Ir a la aplicación ! (server)</a></td></tr></tbody></table></td></tr><tr><td style="word-wrap:break-word;font-size:0;padding:10px 25px;padding-top:30px"><p style="font-size:1px;margin:0 auto;border-top:4px solid #6da71b;width:100%"></p><!--[if mso | IE]><table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" style="font-size:1px;margin:0px auto;border-top:4px solid #6da71b;width:100%;" width="600"><tr><td style="height:0;line-height:0;"> </td></tr></table><![endif]--></td></tr></tbody></table></div><!--[if mso | IE]> </td></tr></table> <![endif]--></td></tr></tbody></table></div><!--[if mso | IE]> </td></tr></table> <![endif]--></div></body></html>'

  return mailTransport.sendMail(mailOptions)
    .then(() => console.log(`Nuevo correo de bienvenida como vendedor-visitante enviado a:`, val.email))
    .catch(error => console.error('Ocurrió un error al enviar email a :', val.email, '. Error: ', error))
})
