import { Salesforce } from './salesforce';

describe('Salesforce', () => {
  it('should create an instance', () => {
    expect(new Salesforce()).toBeTruthy();
  });
});
