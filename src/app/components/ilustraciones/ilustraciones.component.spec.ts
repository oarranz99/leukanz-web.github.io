import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IlustracionesComponent } from './ilustraciones.component';

describe('IlustracionesComponent', () => {
  let component: IlustracionesComponent;
  let fixture: ComponentFixture<IlustracionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IlustracionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IlustracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
