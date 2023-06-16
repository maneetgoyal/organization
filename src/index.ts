import { Mark } from "./example";
import get from "lodash/get";
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

  private fetchEmployee(employeePath: string): Employee | undefined {
    let employee: Employee | undefined;
    if (employeePath === "") {
      employee = this.ceo;
    } else {
      employee = get(this.ceo, employeePath) as Employee | undefined;
    }
    return employee;
  }

  public move(employeeID: number, supervisorID: number): void {
    const newMove: Move = { employeeID, newSupervisorID: supervisorID, oldSupervisorID: supervisorID };
    const employeePath = this.findEmployee(this.ceo, employeeID);
    if (typeof employeePath === "string") {
      const employee = this.fetchEmployee(employeePath);
      if (employee !== undefined) {
        // Change the supervisor of the employee's subordinates
        const oldSupervisorPath = this.getSupervisorPath(employeePath);
        if (typeof oldSupervisorPath === "string") {
          const oldSupervisor = this.fetchEmployee(oldSupervisorPath);
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
          const newSupervisor = this.fetchEmployee(newSupervisorPath);
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
  app.move(12, 14);
})();