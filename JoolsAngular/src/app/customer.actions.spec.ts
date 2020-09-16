import * as CustomerActions from './customer.actions';

describe('Customer', () => {
  it('should create an instance', () => {
    expect(new CustomerActions.LoadCustomers()).toBeTruthy();
  });
});
