import { EmployeeOrgApp } from "./core";
import { Mark } from "./data";

function test() {
  const app = new EmployeeOrgApp(Mark);
  app.move(12, 14);
  app.undo();
}

test();