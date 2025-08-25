import * as yup from "yup";

export const idScanSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  idNumber: yup
    .string()
    .required("ID Number is required")
    .matches(/^\d+$/, "ID Number must be numeric"),
  dob: yup
    .string()
    .required("Date of Birth is required")
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD format"),
     idImage: yup
        .mixed<File>()
       
        .required("ID Image is required") .nullable()
});
