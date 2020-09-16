import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductstoneComponent } from './productstone.component';

describe('ProductstoneComponent', () => {
  let component: ProductstoneComponent;
  let fixture: ComponentFixture<ProductstoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductstoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductstoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
