const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient();

exports.handler = async function (event, context) {
  // your server-side functionality
  const { payload: data, site } = JSON.parse(event.body);
  console.log("payload: ", data);

  const eventId = process.env.COURIER_EVENT || "NETLIFY_FORM_SUBMISSION";
  const recipientId = process.env.COURIER_RECIPIENT;
  const list = process.env.COURIER_LIST;

  if (list) {
    await courier.lists.send({ event: eventId, list, data });
  } else if (recipientId) {
    await courier.send({ eventId, recipientId, data });
  }
};
