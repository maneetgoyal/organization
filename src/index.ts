import type { Employee, IEmployeeOrgApp, Move } from "./types";

export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;

  private moves: Move[];

  constructor(employee: Employee) {
    this.ceo = employee;
    this.moves = [];
  }

  public move(employeeID: number, supervisorID: number): void {
    console.log(employeeID, supervisorID)
  }

  public undo(): void {
    console.log("Undo", this.moves)
  }

  public redo(): void {
    console.log("redo", this.moves)
  }
}