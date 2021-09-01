const UnitValidator = {
  ValidateUndefined: validateUndefined,
  ValidateZeroLength: validateIsNotZeroLength,
  ValidateIsNumber: validateIsNumber,
  ValidateIsNotNull: validateIsNotNull,
  ValidateIsNotNaN: validateIsNotNaN,
  ValidateIsUUID: validateIsUUID,
  ValidateIsFutureDate: validateIsValidFutureDate,
};
function validateUndefined(item: any): boolean {
  return item !== undefined;
}
function validateIsNotZeroLength(item: any): boolean {
  return item.length !== 0;
}
function validateIsNumber(item: any): boolean {
  return !isNaN(parseInt(item));
}
function validateIsNotNull(item: any): boolean {
  return item !== null;
}
function validateIsNotNaN(item: any): boolean {
  return !isNaN(item);
}
function validateIsUUID(item: any): boolean {
  // Regular expression to check if string is a valid UUID
  const regexExp =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  return regexExp.test(item);
}
function validateIsValidFutureDate(item: any): boolean {
  const incomingDate = new Date(item);
  if (!(incomingDate.getDate() && incomingDate.getMinutes())) {
    return false;
  }
  const currentDate = new Date();
  if ((incomingDate as any) - (currentDate as any) < 5) {
    return false;
  }
  return true;
}

function ValidationPipeline(
  validators: ((item: any) => boolean)[],
  item: any,
  label: string
) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < validators.length; i++) {
      if (!validators[i](item)) {
        return reject({
          message: "invalid " + label,
        });
      }
    }
    return resolve(null);
  });
}
export { ValidationPipeline, UnitValidator };
