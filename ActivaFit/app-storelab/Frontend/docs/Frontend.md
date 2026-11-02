# ActivaFit - Frontend

# **0. ISS-00 — Requisitos previos**

## **0.1 Node, npm y Angular CLI**

![](images/clipboard-1980641002.png)

![](images/clipboard-3580469171.png)

## **0.2 Backend en marcha (preparación para integrar HTTP)**

![](images/clipboard-2764398181.png)

## **0.3 Login y permisos**

![](images/clipboard-3586229253.png)

![](images/clipboard-2500710616.png)

## **0.4 Credenciales del seeder**

![](images/clipboard-1232356981.png)

![](images/clipboard-380359690.png)

![](images/clipboard-1936386884.png)

![](images/clipboard-71681031.png)

## **Verificación del ISS**

![](images/clipboard-2444304555.png)

# **1.ISS-01 · Bootstrap Angular 22 con CLI, Tailwind y PrimeNG**

## **1.1 Crear el proyecto en la carpeta actual**

![](images/clipboard-3488756369.png)

## **1.2 Instalar PrimeNG compatible con Angular**

![](images/clipboard-681212818.png)

## **1.3 Estilos globales**

![](images/clipboard-2425900239.png)

## 1.4 Configurar PrimeNG

![](images/clipboard-4132569259.png)

### 1.4.1 Licencia de PrimeNG 22

![](images/clipboard-2309890106.png)

## 1.5 Pantalla de arranque

![](images/clipboard-2842979598.png)

![](images/clipboard-3508720367.png)

## 1.6 Personalizar

![](images/clipboard-1391943812.png)

## 1.7 Ajustar el presupuesto de build

![](images/clipboard-465327057.png)

## 1.8 Primera ejecución

![](images/clipboard-1376869419.png)

## 1.9 Anatomía del componente

![](images/clipboard-1000809613.png)

### 1.9.3 Leer `ejemplo.ts` línea a línea

![](images/clipboard-2010182241.png)

### **1.9.6 `computed` y `effect`: derivar y reaccionar - 1.9.9 Errores comunes**

![](images/clipboard-1693515319.png)

![](images/clipboard-214505767.png)

## Verificación del ISS

![](images/clipboard-1744346359.png)

# Fase I: Frontend — ISS-01A — Esqueleto Header / Aside / contenido / Footer

## 1.1 Qué es un componente y por qué el padre debe importarlo

Un componente en Angular es una parte independiente de la aplicación que reúne tres elementos principales: una clase TypeScript, una plantilla HTML y un archivo CSS. Estos elementos permiten organizar la aplicación en diferentes secciones y reutilizar partes de la interfaz.

El decorador `@Component` relaciona estos archivos y define cómo se utiliza cada componente.

| Campo | ¿Qué función cumple? | Ejemplo en este ISS |
|------------------------|------------------------|------------------------|
| `selector` | Define la etiqueta con la que se utiliza el componente en otra plantilla. | `selector: 'app-header'` → `<app-header />` |
| `imports` | Indica qué componentes o módulos necesita utilizar su propia plantilla. | `[]` en el Header de ISS-01A. |
| `templateUrl` | Indica dónde se encuentra el archivo HTML. | `./header.html` |
| `styleUrl` | Indica dónde se encuentra el archivo de estilos CSS. | `./header.css` |
| `host` | Permite establecer características o clases en el elemento principal del componente. | `host: { class: 'block' }` |

¿Por qué el componente padre debe importarlo?

En Angular, crear un componente no significa que automáticamente aparezca en la aplicación. Para que un componente pueda mostrarse dentro de otro, se deben realizar dos pasos:

Paso 1. Importar el componente en `app.ts`.

En el componente principal se deben importar los componentes que se van a utilizar:

## 1.2 Generar las tres piezas de `layout/`

![](images/clipboard-949080365.png)

## 1.3 Contenido de cada componente

![](images/clipboard-1728785338.png)

## 1.4 Componer las cuatro regiones en `App`

![](images/clipboard-3968905489.png)

## 1.5 Comprobar antes de avanzar

![](images/clipboard-1633110595.png)

![](images/clipboard-436455653.png)

## Verificación del ISS

![](images/clipboard-4045774715.png)

# Fase I: Frontend — ISS-01B — Menú PrimeNG y primera interacción

## 1.1 Los conceptos que se agregan, uno por vez

#### 1. `input()` — Recibir información

Permite que un componente padre le envíe información a un componente hijo.

Por ejemplo, en ActivaFit, el componente `Construir` le enviará al `Aside` las opciones que debe mostrar en el menú.

También podemos enviar el nombre de la aplicación al Header.

#### 2. `output()` — Enviar avisos

Permite que un componente hijo informe al componente padre que ocurrió una acción.

Por ejemplo, cuando el usuario presione el botón del menú en el Header, este enviará un aviso llamado `menuRequested`.

#### 3. `signal()` — Administrar el estado propio

Permite almacenar información que puede cambiar durante la ejecución de la aplicación y actualizar automáticamente la plantilla cuando cambia su valor.

En ActivaFit lo utilizaremos para controlar el título de la pantalla y la visibilidad del menú.

#### 4. Enlaces entre componentes y plantillas

Angular utiliza diferentes formas de comunicación entre la clase TypeScript y el HTML.

| Sintaxis | Función | Ejemplo |
|------------------------|------------------------|------------------------|
| `[propiedad]` | Envía un valor desde la clase hacia una propiedad del componente. | `[model]="items()"` |
| `(evento)` | Escucha una acción o evento. | `(menuRequested)="mobileOpen.set(true)"` |
| `[(visible)]` | Permite comunicar el estado en ambas direcciones. | `[(visible)]="mobileOpen"` |

## 1.2 El Aside recibe el menú con `input()`

![](images/clipboard-3892466149.png)

## 1.3 El Header avisa al padre con `output()`

![](images/clipboard-1167556448.png)

## 1.4 `features/construir`: estado local y Drawer móvil

![](images/clipboard-2429575633.png)

## 1.5 `App` pasa a ser punto de entrada con `router-outlet`

![](images/clipboard-3977332041.png)

## 1.6 Comprobar antes de avanzar

![](images/clipboard-3021972119.png)

![](images/clipboard-2644760982.png)

## Verificación del ISS

![](images/clipboard-699053868.png)

# Fase I: Frontend — ISS-02 — Núcleo: environment, modelos, servicios y layout

## 2.1 `environment`: una sola URL para todo el frente

![](images/clipboard-730668768.png)

### 2.1.1 Licencia PrimeUI (`primeUiLicense`)

![](images/clipboard-3132259616.png)

![](images/clipboard-3387660265.png)

## 2.2 Modelos: reflejar el backend, no inventarlo

![](images/clipboard-1566435947.png)

![](images/clipboard-2180547244.png)

![](images/clipboard-363295401.png)

## 2.3 Servicios HTTP por feature: desenvolver la respuesta

![](images/clipboard-453966537.png)

![](images/clipboard-2726904436.png)

![](images/clipboard-1188614369.png)

## 2.4 Utilidades transversales: `toApiMessage` y `NotificationService`

![](images/clipboard-1666269276.png)

## 2.5 Componentes compartidos: `PageHeader`, `EmptyState`, `StatusTag`

![](images/clipboard-735128766.png)

![](images/clipboard-1208803899.png)

## 2.6 `Shell`: conservar el esqueleto al navegar

![](images/clipboard-57753537.png)

![](images/clipboard-852704591.png)

![](images/clipboard-2766466897.png)

## Verificación del ISS

![](images/clipboard-1223189939.png)

# ISS-03 · CRUD de clientes con Signals

## 3.1 Generar componentes con CLI

![](images/clipboard-197253342.png)

![](images/clipboard-2635317684.png)

## 3.2 Utilidad de filtro local

![](images/clipboard-3750828179.png)

## 3.3 Formulario reactivo reutilizable

![](images/clipboard-910061443.png)

![](images/clipboard-3939016248.png)

## 3.4 Lista con estado en Signals

![](images/clipboard-2547283670.png)

## 3.6 Baja lógica vs baja física

![](images/clipboard-510164470.png)

## Verificación del ISS

![](images/clipboard-3883381042.png)

![](images/clipboard-1976315240.png)

# Fase I: Business — ISS-04 — Entrenadores

## 4.1 Endpoint y contrato

| Operación   | Método y ruta propuesta                  |
|-------------|------------------------------------------|
| Listar      | `GET /api/entrenadores`                  |
| Obtener uno | `GET /api/entrenadores/:id`              |
| Crear       | `POST /api/entrenadores`                 |
| Actualizar  | `PATCH /api/entrenadores/:id`            |
| Reemplazar  | `PUT /api/entrenadores/:id`              |
| Desactivar  | `PATCH /api/entrenadores/:id/deactivate` |
| Eliminar    | `DELETE /api/entrenadores/:id`           |

## 4.2 Generar con CLI

![](images/clipboard-3403182418.png)

## 4.3 Servicio

![](images/clipboard-355220434.png)

## 4.4 Formulario

![](images/clipboard-3231824377.png)

![](images/clipboard-4234163728.png)

## Pruebas

![](images/clipboard-211731440.png)

![](images/clipboard-396206528.png)

# Fase I: Business — ISS-05 — Membresias

### Operaciones de Membresías

| Operación | Método y ruta | Respuesta esperada |
|----|----|----|
| Listar | `GET /api/membresias` | `{ memberships: [...] }` |
| Obtener una | `GET /api/membresias/:id` | `{ membership }` |
| Crear | `POST /api/membresias` | `{ membership }` |
| Editar parcial | `PATCH /api/membresias/:id` | `{ membership }` |
| Reemplazar | `PUT /api/membresias/:id` | `{ membership }` |
| Baja lógica | `PATCH /api/membresias/:id/deactivate` | `{ message, membership }` |
| Baja física | `DELETE /api/membresias/:id` | Pendiente de verificar |

### Campos de Membresías

| Campo          | Tipo                           | Al crear      | Al editar     |
|----------------|--------------------------------|---------------|---------------|
| `cliente_id`   | Número (ID)                    | Por verificar | Por verificar |
| `plan_id`      | Número (ID)                    | Por verificar | Por verificar |
| `fecha_inicio` | Fecha                          | Por verificar | Por verificar |
| `fecha_fin`    | Fecha                          | Por verificar | Por verificar |
| `status`       | Estado (`ACTIVE` / `INACTIVE`) | Por verificar | Por verificar |

## 5.2 Generar con CLI

![](images/clipboard-1400383219.png)
