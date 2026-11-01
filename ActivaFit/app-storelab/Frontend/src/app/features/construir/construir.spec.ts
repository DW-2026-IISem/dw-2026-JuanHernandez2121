import { TestBed } from '@angular/core/testing';
import { Construir } from './construir';

function stubDesktopMedia(matches: boolean): () => void {
  const original = window.matchMedia;

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: (query: string) =>
      ({
        matches,
        media: query,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
      }) as unknown as MediaQueryList,
  });

  return () => {
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      writable: true,
      value: original,
    });
  };
}

describe('Construir', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Construir],
    }).compileComponents();
  });

  async function crearPantalla() {
    const fixture = TestBed.createComponent(Construir);
    await fixture.whenStable();

    return {
      fixture,
      compilado: fixture.nativeElement as HTMLElement,
    };
  }

  function botonMenu(compilado: HTMLElement): HTMLButtonElement {
    const boton = compilado.querySelector(
      'app-header button[aria-label="Mostrar u ocultar el menú"]',
    );

    expect(boton).toBeTruthy();
    return boton as HTMLButtonElement;
  }

  function opcionDelMenu(
    compilado: HTMLElement,
    etiqueta: string,
  ): HTMLElement {
    const opcion = [...compilado.querySelectorAll('a, button')].find(
      (elemento) => elemento.textContent?.trim() === etiqueta,
    );

    expect(opcion).toBeTruthy();
    return opcion as HTMLElement;
  }

  it('should compose the layout and start on Inicio', async () => {
    const { compilado } = await crearPantalla();

    expect(compilado.querySelector('app-header')).toBeTruthy();
    expect(compilado.querySelector('aside app-aside')).toBeTruthy();
    expect(compilado.querySelector('app-footer')).toBeTruthy();
    expect(compilado.querySelector('main h1')?.textContent).toContain('Inicio');
  });

  it('should render the five menu options', async () => {
    const { compilado } = await crearPantalla();
    const texto = compilado.textContent ?? '';

    for (const etiqueta of [
      'Inicio',
      'Clientes',
      'Planes',
      'Membresías',
      'Asistencias',
    ]) {
      expect(texto).toContain(etiqueta);
    }
  });

  it('should always show the menu button', async () => {
    const { compilado } = await crearPantalla();

    expect(botonMenu(compilado).classList.contains('lg:hidden')).toBe(false);
  });

  it('should change the title when an option is selected', async () => {
    const { fixture, compilado } = await crearPantalla();

    opcionDelMenu(compilado, 'Clientes').click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(compilado.querySelector('main h1')?.textContent).toContain(
      'Clientes',
    );
  });

  it('should open the mobile drawer when the menu button is clicked', async () => {
    const { fixture, compilado } = await crearPantalla();

    const componente = fixture.componentInstance as unknown as {
      mobileOpen: () => boolean;
    };

    expect(componente.mobileOpen()).toBe(false);

    botonMenu(compilado).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(componente.mobileOpen()).toBe(true);
  });

  it('should hide the fixed aside on desktop when the button is clicked', async () => {
    const restaurar = stubDesktopMedia(true);

    try {
      const { fixture, compilado } = await crearPantalla();

      expect(compilado.querySelector('aside app-aside')).toBeTruthy();

      botonMenu(compilado).click();
      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.componentInstance.sidebarCollapsed()).toBe(true);
      expect(compilado.querySelector('aside')).toBeNull();
      expect(fixture.componentInstance.mobileOpen()).toBe(false);
    } finally {
      restaurar();
    }
  });

  it('should close the mobile drawer after selecting an option', async () => {
    const { fixture, compilado } = await crearPantalla();

    const componente = fixture.componentInstance as unknown as {
      mobileOpen: () => boolean;
    };

    botonMenu(compilado).click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(componente.mobileOpen()).toBe(true);

    opcionDelMenu(compilado, 'Planes').click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(componente.mobileOpen()).toBe(false);
  });
});
