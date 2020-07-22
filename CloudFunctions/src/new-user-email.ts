
let nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user_email:process.env['EMAIL'],
        pass:process.env['PASSWORD']

    }
})

const messageTemplate ={
    from: process.env['EMAIL'],
    to: '',
    subject: 'Welcome to Your New Account!',
    text: 'Go find friends by logging into your account'
}
/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */
exports.newUserEmail = (event, context) => {
    // const message = event.data
    //   ? Buffer.from(event.data, 'base64').toString()
    //   : 'Hello, World';
    // console.log(message);
    let newUser = JSON.parse(Buffer.from(event.data,'base64').toString())
    messageTemplate.to = newUser.newUserEmail
    transporter.sendMail(messageTemplate)
  };



  //mocking pubsub
  let payload = {
      username:"emma",
      password:""

  }
  let event = {
      data: Buffer.from(JSON.stringify(payload), 'binary')
  }

  exports.newUserEmail(event)