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

#### **5.9 — Módulo global Sequelize**

![](images/clipboard-3725634154.png)

#### **5.10 — Verificar conexión a BD**

![](images/clipboard-779193474.png)

## **FASE 6 — `05_BASE_APP_COMMON_SECURITY`**

#### **6.1 — config/app/app.constants.ts**

![](images/clipboard-757015699.png)

#### **6.2 — config/app/app.config.ts**

![](images/clipboard-2797768496.png)

#### **6.3 — config/logger/logger.config.ts**

![](images/clipboard-2093264850.png)

#### **6.4 — config/logger/logger.module.ts**

![](images/clipboard-3193487141.png)

#### **6.5 — config/jwt/jwt.constants.ts**

![](images/clipboard-1991651233.png)

#### **6.6 — config/jwt/jwt.config.ts**

![](images/clipboard-631052361.png)

#### **6.7 — config/swagger/swagger.constants.ts**

![](images/clipboard-2128399399.png)

#### **6.8 — config/swagger/swagger.config.ts**

![](images/clipboard-1351920581.png)

#### **6.9 — common/enums/status.enum.ts**

![](images/clipboard-2747646899.png)

#### **6.10 — common/enums/http-method.enum.ts**

![](images/clipboard-1978589494.png)

#### **6.11 — common/enums/sort-order.enum.ts**

![](images/clipboard-3294795332.png)

#### **6.12 — common/constants/app.constants.ts**

![](images/clipboard-1216595779.png)

#### **6.13 — common/constants/pagination.constants.ts**

![](images/clipboard-96512602.png)

#### **6.14 — common/exceptions/application.exception.ts**

![](images/clipboard-1366196197.png)

#### **6.15 — common/exceptions/domain.exception.ts**

![](images/clipboard-3386590769.png)

#### **6.16 — common/exceptions/entity-not-found.exception.ts**

![](images/clipboard-1192041365.png)

#### **6.17 — common/exceptions/validation.exception.ts**

![](images/clipboard-2650872101.png)

#### **6.18 — common/filters/global-exception.filter.ts**

![](images/clipboard-2915089724.png)

#### **6.19 — common/filters/sequelize-exception.filter.ts**

![](images/clipboard-1028782586.png)

#### **6.20 — common/interceptors/response.interceptor.ts**

![](images/clipboard-996964293.png)

#### **6.21 — common/interceptors/logging.interceptor.ts**

![](images/clipboard-3292927976.png)

#### **6.22 — common/interceptors/timeout.interceptor.ts**

![](images/clipboard-2972586912.png)

#### **6.23 — common/pipes/validation.pipe.ts**

![](images/clipboard-3959055932.png)

#### **6.24 — common/pipes/parse-positive-int.pipe.ts**

![](images/clipboard-2888465971.png)

#### **6.25 — common/decorators/public.decorator.ts**

![](images/clipboard-3717651419.png)

#### **6.26 — common/decorators/roles.decorator.ts**

![](images/clipboard-3120497534.png)

#### **6.27 — common/decorators/current-user.decorator.ts**

![](images/clipboard-511774849.png)

#### **6.28 — common/decorators/resource.decorator.ts**

![](images/clipboard-184131715.png)
