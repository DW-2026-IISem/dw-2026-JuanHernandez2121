# **Manual de creación del Backend — NestJS + Sequelize (Clean Architecture)**

#### **1.1 — Crear carpetas padre y permisos**

```         
mkdir -p /home/portatiljq/apps/dlloweb/nestjs/express_sequelize chmod -R 755 /home/portatiljq/apps/dlloweb/nestjs/express_sequelize
```

![](images/clipboard-4196691445.png)

#### **1.2 — Instalar Nest CLI (si no existe)**

![](images/clipboard-82782016.png)

#### **1.3 — Crear proyecto NestJS**

![](images/clipboard-2508159013.png)

#### **1.4 — Crear `.env` mínimo (puerto)**

![](images/clipboard-1482328124.png)

## **FASE 2 — `01_BASE_DEPS_Y_PUERTO`**

#### **2.1 — Dependencias de producción**

![](images/clipboard-898863254.png)

#### **2.2 — Dependencias de desarrollo**

![](images/clipboard-2407444961.png)

#### **2.3 — Script para liberar puerto (evita EADDRINUSE)**

![](images/clipboard-660548908.png)

#### **2.4 — Actualizar scripts npm en package.json**

![](images/clipboard-1155584981.png)

#### **2.5 — Verificar arranque base**

![](images/clipboard-2664551511.png)

## **FASE 3 — `02_BASE_ESTRUCTURA_CA`**

#### **3.1 — Crear árbol base de carpetas**

![](images/clipboard-1151236143.png)

## **FASE 4 — `03_BASE_ENTORNO_ENV`**

#### **4.1 — Crear `.env.example` y actualizar `.env` completo**

![](images/clipboard-2998955148.png)

#### **4.2 — Interface de entorno**

![](images/clipboard-3947818235.png)

#### **4.3 — Validación de entorno con class-validator**

![](images/clipboard-1333180203.png)

#### **4.4 — Resolver de credenciales por motor**

![](images/clipboard-3021671294.png)

#### **4.5 — Factory registerAs de entorno**

![](images/clipboard-1374441791.png)

## **FASE 5 — `04_BASE_DATABASE_SEQUELIZE`**

#### **5.1 — Constante SEQUELIZE_TOKEN**

![](images/clipboard-712050827.png)

#### **5.2 — Tipos auxiliares de database config**

![](images/clipboard-309026772.png)

#### **5.3 — database.config.ts**

![](images/clipboard-2592340035.png)

#### **5.4 — database.module.ts / providers**

![](images/clipboard-1774101314.png)

#### **5.5 — database.providers.ts**

![](images/clipboard-732689670.png)

#### **5.6 — Opciones Sequelize por dialecto**

![](images/clipboard-3994258583.png)

#### **5.7 — Factory Sequelize (sin modelos aún)**

![](images/clipboard-3747912352.png)

#### **5.8 — DatabaseSeederService (sin seeders aún)**

![](images/clipboard-1659642230.png)
