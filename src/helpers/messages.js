import messages from '../config/messages.js'

export const getMessage = (path) => {
  return messages[path] || null;
};
