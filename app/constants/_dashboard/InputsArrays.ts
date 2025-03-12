import countries from "../_website/countries";

export const addUserinputs = [
  {
    name: "image",
    type: "file",
    fildType: "user-image",
    label: { ar: "صورة المستخدم", en: "" },
  },
  {
    name: "name",
    type: "text",
    fildType: "short-text",
    label: { ar: "الإسم", en: "" },
    placeholder: "أدخل إسم الحساب الجديد",
  },
  {
    name: "email",
    type: "email",
    fildType: "short-text",
    label: { ar: "البريد الإلكترونى", en: "" },
    placeholder: "أدخل البريد الإلكترونى للحساب الجديد",
  },
  {
    name: "password",
    type: "password",
    fildType: "short-text",
    label: { ar: "كلمة السر", en: "" },
    placeholder: "أدخل  كلمة السر للحساب الجديد",
  },
  {
    name: "birth_date",
    type: "date",
    fildType: "short-text",
    label: { ar: "تاريخ الميلاد", en: "" },
    placeholder: "أدخل  كلمة السر للحساب الجديد",
  },
  {
    name: "country",
    type: "",
    fildType: "select-type",
    label: { ar: " بلد المستخدم", en: "" },
    placeholder: "أدخل  كلمة السر للحساب الجديد",
    selectItems: countries,
  },
  {
    name: "gender",
    type: "",
    fildType: "select-type",
    label: { ar: "نوع الحساب", en: "" },
    placeholder: "",
    selectItems: [{ name: "male" }, { name: "female" }],
  },
  {
    name: "role",
    type: "",
    fildType: "select-type",
    label: { ar: "نوع الحساب", en: "" },
    placeholder: "",
    selectItems: [{ name: "admin" }, { name: "user" }],
  },
];
