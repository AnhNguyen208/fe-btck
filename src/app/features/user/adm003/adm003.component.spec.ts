import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adm003Component } from './adm003.component';

describe('Adm003Component', () => {
  let component: Adm003Component;
  let fixture: ComponentFixture<Adm003Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Adm003Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adm003Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
