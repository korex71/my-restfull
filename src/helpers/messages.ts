import messages from "../config/messages";

export const getMessage = (path) => {
  return messages[path] || null;
};
