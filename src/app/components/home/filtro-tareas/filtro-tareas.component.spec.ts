import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTareasComponent } from './filtro-tareas.component';

describe('FiltroTareasComponent', () => {
  let component: FiltroTareasComponent;
  let fixture: ComponentFixture<FiltroTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltroTareasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
