export const LIMITS = {
  name: 60,
  nickname: 30,
  short: 120,
  long: 400,
};

const isBlank = (value) => !value || !String(value).trim();

export function validateFriend(form) {
  const errors = {};

  if (isBlank(form.name)) {
    errors.name = "Please enter your friend's name.";
  } else if (form.name.trim().length > LIMITS.name) {
    errors.name = `Please keep the name under ${LIMITS.name} characters.`;
  }

  if (form.nickname && form.nickname.trim().length > LIMITS.nickname) {
    errors.nickname = `Nicknames can be up to ${LIMITS.nickname} characters.`;
  }

  if (form.dateOfBirth) {
    const date = new Date(form.dateOfBirth);
    if (Number.isNaN(date.getTime())) {
      errors.dateOfBirth = "Please pick a valid date.";
    } else if (date > new Date()) {
      errors.dateOfBirth = "A birthday can't be in the future.";
    }
  }

  if (isBlank(form.howWeMet)) {
    errors.howWeMet = "Tell us how you two met — even one line is enough.";
  }

  ["firstImpression", "bestMemory", "message"].forEach((key) => {
    if (form[key] && form[key].trim().length > LIMITS.long) {
      errors[key] = `Please keep this under ${LIMITS.long} characters.`;
    }
  });

  return errors;
}

export function validateSlamBook(form) {
  const errors = {};

  if (isBlank(form.name)) errors.name = "Please enter your name.";
  if (form.name && form.name.trim().length > LIMITS.name)
    errors.name = `Please keep the name under ${LIMITS.name} characters.`;
  if (isBlank(form.about)) errors.about = "Write a little about yourself.";
  if (form.about && form.about.trim().length > LIMITS.long)
    errors.about = `Please keep this under ${LIMITS.long} characters.`;

  if (form.dateOfBirth) {
    const date = new Date(form.dateOfBirth);
    if (Number.isNaN(date.getTime())) errors.dateOfBirth = "Please pick a valid date.";
    else if (date > new Date()) errors.dateOfBirth = "A birthday can't be in the future.";
  }

  return errors;
}

export function trimForm(form) {
  return Object.fromEntries(
    Object.entries(form).map(([key, value]) =>
      typeof value === "string" ? [key, value.trim()] : [key, value],
    ),
  );
}
