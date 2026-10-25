export const areas = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export function validateOrder(form) {
  const fieldErrors = {};

  if (typeof form.name !== "string" || !form.name.trim()) {
    fieldErrors.name = "Enter your name.";
  }

  if (
    typeof form.phone !== "string" ||
    !/^(?:\+251|0)9\d{8}$/.test(form.phone)
  ) {
    fieldErrors.phone =
      "Use a TeleBirr number like 0912345678 or +251912345678.";
  }

  if (!areas.includes(form.area)) {
    fieldErrors.area = "Choose a delivery area.";
  }

  return fieldErrors;
}
