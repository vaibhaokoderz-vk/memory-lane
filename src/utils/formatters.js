export function initials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "💖";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatBirthday(value) {
  if (!value) return "Not added yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not added yet";
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export function genderLabel(gender) {
  if (!gender) return "";
  return gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();
}

/** Deterministic avatar tint so each friend keeps the same colour. */
export function avatarTint(name = "") {
  const tints = ["primary", "secondary", "accent"];
  let sum = 0;
  for (let i = 0; i < name.length; i += 1) sum += name.charCodeAt(i);
  return tints[sum % tints.length];
}
