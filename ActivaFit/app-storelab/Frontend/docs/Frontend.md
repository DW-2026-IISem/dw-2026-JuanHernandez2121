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
|----|----|----|
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
