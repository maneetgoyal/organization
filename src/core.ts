import get from "lodash/get";
import type { Employee, IEmployeeOrgApp, Move } from "./types";

export class EmployeeOrgApp implements IEmployeeOrgApp {
    ceo: Employee;

    private lastMove?: Move;

    private undid: boolean;

    constructor(employee: Employee) {
        this.ceo = employee;
        this.undid = false;
    }

    private findEmployeePath(currentEmployee: Employee, employeeID: number): string | undefined {
        let path: string | undefined;
        if (currentEmployee.uniqueID === employeeID) {
            path = "";
        } else {
            const index = currentEmployee.subordinates.findIndex(ele => ele.uniqueID === employeeID);
            if (index !== -1) {
                path = `subordinates[${index}]`;
            } else {
                const paths = currentEmployee.subordinates.map((ele) => this.findEmployeePath(ele, employeeID));
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
        this.lastMove = { employeeID, oldSupervisorID: NaN, newSupervisorID: supervisorID, subordinatesMoved: [] };
        const employeePath = this.findEmployeePath(this.ceo, employeeID);
        if (typeof employeePath === "string") {
            const employee = this.fetchEmployee(employeePath);
            if (employee !== undefined) {
                // Change the supervisor of the employee's subordinates
                const oldSupervisorPath = this.getSupervisorPath(employeePath);
                if (typeof oldSupervisorPath === "string") {
                    const oldSupervisor = this.fetchEmployee(oldSupervisorPath);
                    if (typeof oldSupervisor !== undefined) {
                        this.lastMove.oldSupervisorID = oldSupervisor?.uniqueID ?? NaN;
                        while (employee.subordinates.length > 0) {
                            const subordinate = employee.subordinates.pop() as Employee;
                            oldSupervisor?.subordinates.push(subordinate);
                            this.lastMove.subordinatesMoved.push(subordinate);
                        }
                    }
                }

                // Change the supervisor of the employee
                const newSupervisorPath = this.findEmployeePath(this.ceo, supervisorID);
                if (typeof newSupervisorPath === "string") {
                    const newSupervisor = this.fetchEmployee(newSupervisorPath);
                    if (newSupervisor !== undefined) {
                        newSupervisor.subordinates.push(employee);
                    }
                }
            }
        }
    }

    public undo(): void {
        if (this.undid === false) {
            console.log(".....", this.lastMove)
            this.undid = true;
        }
    }

    public redo(): void {
        if (this.lastMove !== undefined && this.undid === true) {
            this.move(this.lastMove.employeeID, this.lastMove.newSupervisorID);
            this.undid = false;
        }
    }
}