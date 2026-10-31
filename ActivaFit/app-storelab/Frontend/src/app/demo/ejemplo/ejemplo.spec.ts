import { TestBed } from '@angular/core/testing';
import { Ejemplo } from './ejemplo';

describe('Ejemplo', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejemplo],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(Ejemplo);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display the ActivaFit monthly plan', async () => {
    const fixture = TestBed.createComponent(Ejemplo);
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Plan Mensual');
    expect(compiled.textContent).toContain('$ 89.900 COP');
    expect(compiled.textContent).toContain('30 días');
  });

  it('should respond when consulting the plan', () => {
    const fixture = TestBed.createComponent(Ejemplo);
    const component = fixture.componentInstance;

    component.consultarPlan();

    expect(component.mensaje).toContain('disponible para consulta');
  });
});
