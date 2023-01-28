import * as yup from "yup";
// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const Schema = yup.object().shape({
  title: yup.string().required("required"),
});

export { Schema };
