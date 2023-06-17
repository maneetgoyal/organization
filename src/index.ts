import { EmployeeOrgApp } from "./core";
import { Mark } from "./example";

function test() {
  const app = new EmployeeOrgApp(Mark);
  app.move(12, 14);
  app.undo();
}

test();