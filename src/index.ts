import type { Employee, IEmployeeOrgApp } from "./types";

export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;

  constructor(employee: Employee) {
    this.ceo = employee;
  }

  public move(employeeID: number, supervisorID: number): void {
    console.log(employeeID, supervisorID)
  }

  public undo(): void {
    console.log("Undo")
  }

  public redo(): void {
    console.log("redo")
  }
}