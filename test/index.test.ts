import { EmployeeOrgApp } from '../src';
import { Mark } from '../src/example';

describe('Class test', () => {
  it('works', () => {
    const app = new EmployeeOrgApp(Mark);
    console.log(app.ceo);
  });
});
