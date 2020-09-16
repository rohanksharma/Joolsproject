import { Action } from '@ngrx/store';

export enum CustomerActionTypes {
  LoadCustomers = '[Customer] Load Customers',
  LoadCustomersSuccess = '[Customer] Load Customers Success',
  LoadCustomersFailure = '[Customer] Load Customers Failure',
}

export class LoadCustomers implements Action {
  readonly type = CustomerActionTypes.LoadCustomers;
}

export class LoadCustomersSuccess implements Action {
  readonly type = CustomerActionTypes.LoadCustomersSuccess;
  constructor(public payload: { data: any }) { }
}

export class LoadCustomersFailure implements Action {
  readonly type = CustomerActionTypes.LoadCustomersFailure;
  constructor(public payload: { error: any }) { }
}

export type CustomerActions = LoadCustomers | LoadCustomersSuccess | LoadCustomersFailure;

