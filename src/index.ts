import type { Employee, IEmployeeOrgApp, Move } from "./types";

export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;

  private moves: Move[];

  constructor(employee: Employee) {
    this.ceo = employee;
    this.moves = [];
  }

  private findEmployee(currentEmployee: Employee, employeeID: number): string | undefined {
    let path: string | undefined;
    if (currentEmployee.uniqueID === employeeID) {
      path = "uniqueID";
    } else {
      const index = currentEmployee.subordinates.findIndex(ele => ele.uniqueID === employeeID);
      if (index !== -1) {
        path = `subordinates[${index}]`;
      } else {
        const paths = currentEmployee.subordinates.map((ele) => this.findEmployee(ele, employeeID));
        const index = paths.findIndex(ele => typeof ele === "string");
        if (index !== -1) {
          path = `subordinates[${index}].${paths[index]}`;
        }
      }
    }
    return path;
  }

  public move(employeeID: number, supervisorID: number): void {
    const newMove: Move = { employeeID, newSupervisorID: supervisorID, oldSupervisorID: supervisorID };
    this.moves.push(newMove);
  }

  public undo(): void {
    console.log("Undo", this.moves)
  }

  public redo(): void {
    console.log("redo", this.moves)
  }
}