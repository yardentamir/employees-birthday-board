import { IEmployeeDocument } from "../types/employee.type";

export const clearTokens = async (
  employee: IEmployeeDocument,
  clearAll: boolean = false,
  tokenToExclude: null | string = null
) => {
  employee.tokens = clearAll
    ? []
    : employee.tokens.filter((token) => token.token !== tokenToExclude);
  await employee.save();
};
