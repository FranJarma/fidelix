export const FORM_MODE = {
  CREATE: "create",
  EDIT: "edit",
} as const;

export enum FormModeEnum {
  CREATE = "create",
  EDIT = "edit",
}

export enum FormFieldTypeEnum {
  CHECKBOX = "checkbox",
  CURRENCY = "currency",
  DATE = "date",
  DATETIME = "datetime",
  EMAIL = "email",
  NUMBER = "number",
  PHONE = "phone",
  SELECT = "select",
  TEXT = "text",
  TEXTAREA = "textarea",
  TIME = "time",
  URL = "url",
}
