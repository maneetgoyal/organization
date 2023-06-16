import { Mark } from "./example";
import { get } from "lodash";
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
      path = "";
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

  private getSupervisorPath(input?: string): string | undefined {
    const index = input?.lastIndexOf(".");
    let path: string | undefined;
    if (typeof index === "number" && index !== -1) {
      path = input?.substring(0, index);
    }
    return path;
  }

  public move(employeeID: number, supervisorID: number): void {
    const newMove: Move = { employeeID, newSupervisorID: supervisorID, oldSupervisorID: supervisorID };
    const employeePath = this.findEmployee(this.ceo, employeeID);
    if (typeof employeePath === "string") {
      const employee = get(this.ceo, employeePath) as Employee | undefined;
      if (employee !== undefined) {
        // Change the supervisor of the employee's subordinates
        const oldSupervisorPath = this.getSupervisorPath(employeePath);
        if (typeof oldSupervisorPath === "string") {
          const oldSupervisor = get(this.ceo, oldSupervisorPath) as Employee | undefined;
          if (typeof oldSupervisor !== undefined) {
            while (employee.subordinates.length > 0) {
              const subordinate = employee.subordinates.pop() as Employee;
              oldSupervisor?.subordinates.push(subordinate);
            }
          }
        }

        // Change the supervisor of the employee
        const newSupervisorPath = this.findEmployee(this.ceo, supervisorID);
        if (typeof newSupervisorPath === "string") {
          const newSupervisor = get(this.ceo, newSupervisorPath) as Employee | undefined;
          if (newSupervisor !== undefined) {
            newSupervisor.subordinates.push(employee);
          }
        }
      }
    }


    this.moves.push(newMove);
  }

  public undo(): void {
    console.log("Undo", this.moves)
  }

  public redo(): void {
    console.log("redo", this.moves)
  }
}

(() => {
  const app = new EmployeeOrgApp(Mark);
  console.log(JSON.stringify(Mark));
  app.move(12, 14);
  console.log(JSON.stringify(app.ceo));
})();