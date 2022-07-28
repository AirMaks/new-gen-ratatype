export const detectKeyboardLang = (e: React.KeyboardEvent<Document>) => {
  let re = /^[a-zA-Z\s]*$/g;
  let a = e.key.match(re);

  if (a == null) {
    return false;
  }

  return true;
};
