export interface Employee {
  uniqueID: number;
  name: string;
  subordinates: Employee[];
}

export interface Move {
  employeeID: number;
  newSupervisorID: number;
  oldSupervisorID: number;
}

export interface IEmployeeOrgApp {
  ceo: Employee;
  /**
   * Moves the employee with employeeID (uniqueId) under a supervisor (another employee) that has supervisorID (uniqueId).
   * @param employeeID
   * @param supervisorID
   */
  move(employeeID: number, supervisorID: number): void;
  /**
   * Undo last move action
   */
  undo(): void;
  /**
   * Redo last undone action
   */
  redo(): void;
}
