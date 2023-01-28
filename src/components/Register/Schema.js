import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const Schema = yup.object().shape({
  email: yup.string().email("pls provide a valid email").required("required"),
  name: yup.string().required("required"),
  password: yup
    .string()
    .min(5)
    .matches(passwordRules, { message: "Please create a secure password" })
    .required(),
});

export { Schema };
