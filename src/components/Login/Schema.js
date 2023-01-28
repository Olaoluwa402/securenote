import * as yup from "yup";
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const Schema = yup.object().shape({
  email: yup.string().email("pls provide a valid email").required("required"),
  password: yup.string().required("Pls enter your password"),
});

export { Schema };
