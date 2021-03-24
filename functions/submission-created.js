const { CourierClient } = require("@trycourier/courier");
const courier = CourierClient();

exports.handler = async function (event) {
  const {
    payload: { data, form_name }
  } = JSON.parse(event.body);

  const eventId =
    process.env.COURIER_EVENT || `NETLIFY_FORM_${form_name.toUpperCase()}`;
  const recipientId = process.env.COURIER_RECIPIENT;
  const list = process.env.COURIER_LIST;

  if (list) {
    try {
      const { messageId } = await courier.lists.send({
        event: eventId,
        list,
        data
      });
      console.log(`Message sent to Courier List ${list}: ${messageId}`);
    } catch (error) {
      console.log(
        `An error occurred sending to the Courier List ${list}:`,
        error
      );
    }
  } else if (recipientId) {
    try {
      const { messageId } = await courier.send({ eventId, recipientId, data });
      console.log(
        `Message sent to Courier Recipient ${recipientId}: ${messageId}`
      );
    } catch (error) {
      console.log(
        `An error occured sending to the Courier Recipient ${recipientId}:`,
        error
      );
    }
  } else {
    console.log(
      `No message sent. Please set a list or recipient using the environment variables.`
    );
  }
};
