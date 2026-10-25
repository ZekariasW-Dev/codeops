export const deliveryAreas = ["Bole", "Kazanchis", "Megenagna", "Piassa"];

export function validateOrder(form) {
  const errors = {};
  const name = typeof form.name === "string" ? form.name.trim() : "";
  const phone = typeof form.phone === "string" ? form.phone.trim() : "";
  const area = typeof form.area === "string" ? form.area : "";

  if (!name) errors.name = "Enter your name.";
  if (!/^(?:\+251|0)9\d{8}$/.test(phone)) {
    errors.phone = "Use a TeleBirr number like 0912345678 or +251912345678.";
  }
  if (!deliveryAreas.includes(area)) errors.area = "Choose a delivery area.";

  return errors;
}