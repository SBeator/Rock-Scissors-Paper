const actionToMessage = (action) => JSON.stringify(action);
const messageToAction = (message) => {
  let messageObject;
  try {
    messageObject = JSON.parse(message);
  } catch (error) {
    messageObject = {
      error
    };
  }

  return messageObject;
};

export {
  actionToMessage,
  messageToAction
};
