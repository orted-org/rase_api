const UnitValidator = {
  ValidateUndefined: validateUndefined,
  ValidateZeroLength: validateIsNotZeroLength,
  ValidateIsNumber: validateIsNumber,
  ValidateIsNotNull: validateIsNotNull,
  ValidateIsNotNaN: validateIsNotNaN,
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
