export const checkKeyboard = (e: any) => {
  let re = /^[a-zA-Z\s]*$/g;
  let a = e.key.match(re);

  if (a == null) {
    // alert("Change keyboard language to english");
    return false;
  }

  return true;
};
