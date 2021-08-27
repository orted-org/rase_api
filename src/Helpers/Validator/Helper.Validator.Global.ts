function validateUndefined(item: any): boolean {
  return item !== undefined;
}
function validateZeroLength(item: string | any[]) {
  return item.length !== 0;
}
function validateIsNumber(item: any): boolean {
  return !isNaN(parseInt(item));
}
function validateIsNull(item: any): boolean {
  return item !== null;
}
function validateIsNotNaN(item: any): boolean {
  return !isNaN(item);
}
function validationPipeline(validators: ((item: any) => boolean)[], item: any) {
  for (let i = 0; i < validators.length; i++) {
    if (!validators[i](item)) {
      return false;
    }
  }
  return true;
}
export {
  validateUndefined,
  validateZeroLength,
  validateIsNumber,
  validateIsNull,
  validationPipeline,
  validateIsNotNaN,
};
