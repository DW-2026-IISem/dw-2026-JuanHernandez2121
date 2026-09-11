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

#### **6.29 — common/interfaces/authenticated-user.interface.ts**

![](images/clipboard-2290612704.png)

#### **6.30 — common/interfaces/pagination.interface.ts**

![](images/clipboard-1419896285.png)

#### **6.31 — common/interfaces/api-response.interface.ts**

![](images/clipboard-135716071.png)

#### **6.32 — common/types/nullable.type.ts**

![](images/clipboard-2380901041.png)

#### **6.33 — common/types/optional.type.ts**

![](images/clipboard-681499064.png)

#### **6.34 — common/utils/pagination.util.ts**

![](images/clipboard-513214439.png)

#### **6.35 — common/utils/date.util.ts**

![](images/clipboard-1796060711.png)

#### **6.36 — common/utils/string.util.ts**

![](images/clipboard-2140339656.png)

#### **6.37 — infrastructure/security/hashing/password-hasher.interface.ts**

![](images/clipboard-1540997099.png)

#### **6.38 — infrastructure/security/hashing/bcrypt-password-hasher.service.ts**

![](images/clipboard-1208333180.png)

#### **6.39 — infrastructure/security/tokens/token.interface.ts**

![](images/clipboard-300919328.png)

#### **6.40 — infrastructure/security/tokens/token.service.ts**

![](images/clipboard-3562656589.png)

#### **6.41 — infrastructure/security/security.module.ts**

![](images/clipboard-806808379.png)

#### **6.42 — Actualizar main.ts (bootstrap completo)**

![](images/clipboard-99477889.png)

#### **6.43 — Actualizar app.module.ts (base sin features ni guards)**

![](images/clipboard-2363657640.png)

#### **6.44 — Verificar bootstrap transversal**

![](images/clipboard-3821043683.png)

## **FASE 7 — `06_BUSINESS_CLIENTS`**

#### **7.1 — features/business/clients/domain/entities/client.entity.ts**

![](images/clipboard-2086159183.png)

#### **7.2 — features/business/clients/domain/exceptions/client-email-already-exists.exception.ts**

![](images/clipboard-1255183645.png)

#### **7.3 — features/business/clients/domain/exceptions/client-not-found.exception.ts**

![](images/clipboard-2576758332.png)

#### **7.4 — features/business/clients/domain/interfaces/client-repository.interface.ts**

![](images/clipboard-3110279251.png)

#### **7.5 — features/business/clients/domain/validators/client-email.validator.ts**

![](images/clipboard-3688541909.png)

#### **7.6 — features/business/clients/domain/validators/client-phone.validator.ts**

![](images/clipboard-2430915385.png)

#### **7.7 — features/business/clients/infrastructure/persistence/models/client.model.ts**

![](images/clipboard-2171629823.png)

#### **7.8 — features/business/clients/infrastructure/persistence/repositories/client.repository.ts**

![](images/clipboard-3818079111.png)

#### **7.9 — features/business/clients/infrastructure/persistence/migrations/create-clients-table.migration.ts**

![](images/clipboard-2218442316.png)

#### **7.10 — features/business/clients/infrastructure/persistence/seeders/clients.seeder.ts**

![](images/clipboard-1848262437.png)

#### **7.11 — features/business/clients/application/dto/client-filter.dto.ts**

![](images/clipboard-3060292404.png)

#### **7.12 — features/business/clients/application/dto/client-response.dto.ts**

![](images/clipboard-1558166478.png)

#### **7.13 — features/business/clients/application/dto/create-client.dto.ts**

![](images/clipboard-2992947826.png)

#### **7.14 — features/business/clients/application/dto/update-client.dto.ts**

![](images/clipboard-917233092.png)

#### **7.15 — features/business/clients/application/mappers/client.mapper.ts**

![](images/clipboard-3900849401.png)

#### **7.16 — features/business/clients/application/use-cases/create-client.use-case.ts**

![](images/clipboard-3409915000.png)

#### **7.17 — features/business/clients/application/use-cases/delete-client.use-case.ts**

![](images/clipboard-2171503545.png)

#### **7.18 — features/business/clients/application/use-cases/get-client.use-case.ts**

![](images/clipboard-4114970081.png)

#### **7.19 — features/business/clients/application/use-cases/list-clients.use-case.ts**

![](images/clipboard-1645681740.png)

#### **7.20 — features/business/clients/application/use-cases/update-client.use-case.ts**

![](images/clipboard-1897335611.png)

#### **7.21 — features/business/clients/presentation/http/serializers/client.serializer.ts**

![](images/clipboard-1323544958.png)

#### **7.22 — features/business/clients/presentation/http/controllers/clients.controller.ts**

![](images/clipboard-2319349750.png)

#### **7.23 — features/business/clients/index.ts**

![](images/clipboard-310123730.png)

#### **7.24 — features/business/clients/clients.module.ts**

![](images/clipboard-3378632187.png)

#### **7.25 — Actualizar sequelize.factory.ts (registrar modelos)**

![](images/clipboard-2413221630.png)

#### **7.26 — Actualizar business.module.ts**

![](images/clipboard-3164793509.png)

#### **7.27 — Actualizar database-seeder.service.ts**

![](images/clipboard-1009401832.png)

#### **7.28 — Actualizar app.module.ts**

![](images/clipboard-2504336359.png)

#### **7.29 — Verificar tabla física `clients` y API**

![](images/clipboard-964740617.png)

## **FASE 8 — `07_BUSINESS_PRODUCT_TYPES`**

#### **8.1 — features/business/product-types/domain/entities/product-type.entity.ts**

![](images/clipboard-2001160170.png)

#### **8.2 — features/business/product-types/domain/exceptions/product-type-not-found.exception.ts**

![](images/clipboard-840727533.png)

#### **8.3 — features/business/product-types/domain/interfaces/product-type-repository.interface.ts**

![](images/clipboard-1384547118.png)

#### **8.4 — features/business/product-types/infrastructure/persistence/models/product-type.model.ts**

![](images/clipboard-578050570.png)

#### **8.5 — features/business/product-types/infrastructure/persistence/repositories/product-type.repository.ts**

![](images/clipboard-3131204632.png)

#### **8.6 — features/business/product-types/infrastructure/persistence/migrations/create-product-types-table.migration.ts**

![](images/clipboard-1819580341.png)

#### **8.7 — features/business/product-types/infrastructure/persistence/seeders/product-types.seeder.ts**

![](images/clipboard-3319449383.png)

#### **8.8 — features/business/product-types/application/dto/create-product-type.dto.ts**

![](images/clipboard-3595544263.png)

#### **8.9 — features/business/product-types/application/dto/product-type-filter.dto.ts**

![](images/clipboard-3755272795.png)

#### **8.10 — features/business/product-types/application/dto/product-type-response.dto.ts**

![](images/clipboard-3221277186.png)

#### **8.11 — features/business/product-types/application/dto/update-product-type.dto.ts**

![](images/clipboard-457175739.png)

#### **8.12 — features/business/product-types/application/mappers/product-type.mapper.ts**

![](images/clipboard-3233976244.png)

#### **8.13 — features/business/product-types/application/use-cases/create-product-type.use-case.ts**

![](images/clipboard-696565183.png)

#### **8.14 — features/business/product-types/application/use-cases/delete-product-type.use-case.ts**

![](images/clipboard-2211781372.png)

#### **8.15 — features/business/product-types/application/use-cases/get-product-type.use-case.ts**

![](images/clipboard-3199387070.png)

#### **8.16 — features/business/product-types/application/use-cases/list-product-types.use-case.ts**

![](images/clipboard-2444829603.png)

#### **8.17 — features/business/product-types/application/use-cases/update-product-type.use-case.ts**

![](images/clipboard-2357435504.png)

#### **8.18 — features/business/product-types/presentation/http/serializers/product-type.serializer.ts**

![](images/clipboard-2894736484.png)

#### **8.19 — features/business/product-types/presentation/http/controllers/product-types.controller.ts**

![](images/clipboard-16821075.png)

#### **8.20 — features/business/product-types/index.ts**

![](images/clipboard-3535800644.png)

#### **8.21 — features/business/product-types/product-types.module.ts**

![](images/clipboard-3738021863.png)

#### **8.22 — Actualizar sequelize.factory.ts (registrar modelos)**

![](images/clipboard-3171894420.png)

#### **8.23 — Actualizar business.module.ts**

![](images/clipboard-1669604388.png)

#### **8.24 — Actualizar database-seeder.service.ts**

![](images/clipboard-418830058.png)

#### **8.25 — Actualizar app.module.ts**

![](images/clipboard-350365995.png)

#### **8.26 — Verificar tabla `product_types`**

![](images/clipboard-3738810474.png)

## **FASE 9 — `08_BUSINESS_PRODUCTS`**

#### **9.1 — features/business/products/domain/entities/product.entity.ts**

![](images/clipboard-3274276967.png)

#### **9.2 — features/business/products/domain/exceptions/invalid-product-price.exception.ts**

![](images/clipboard-4200516580.png)

#### **9.3 — features/business/products/domain/exceptions/invalid-product-stock.exception.ts**

![](images/clipboard-1136064247.png)

#### **9.4 — features/business/products/domain/exceptions/product-not-found.exception.ts**

![](images/clipboard-2314677744.png)

#### **9.5 — features/business/products/domain/interfaces/product-repository.interface.ts**

![](images/clipboard-3494283399.png)

#### **9.6 — features/business/products/domain/validators/product-price.validator.ts**

![](images/clipboard-316689874.png)

#### **9.7 — features/business/products/domain/validators/product-stock.validator.ts**

![](images/clipboard-572040453.png)

#### **9.8 -features/business/products/infrastructure/persistence/models/product.model.ts**

![](images/clipboard-1171549256.png)

#### **9.9-features/business/products/infrastructure/persistence/repositories/product.repository.ts**

![](images/clipboard-521019408.png)

#### **9.10 — features/business/products/infrastructure/persistence/migrations/create-products-table.migration.ts**

![](images/clipboard-2084060279.png)

#### **9.11 — features/business/products/infrastructure/persistence/seeders/products.seeder.ts**

![](images/clipboard-367605598.png)

#### **9.12 — features/business/products/application/dto/create-product.dto.ts**

![](images/clipboard-483591021.png)

#### **9.13 — features/business/products/application/dto/product-filter.dto.ts**

![](images/clipboard-3589742606.png)

#### **9.14 — features/business/products/application/dto/product-response.dto.ts**

![](images/clipboard-296135712.png)

#### **9.15 — features/business/products/application/dto/update-product.dto.ts**

![](images/clipboard-242071539.png)

#### **9.16 — features/business/products/application/mappers/product.mapper.ts**

![](images/clipboard-708470403.png)

#### **9.17 — features/business/products/application/use-cases/create-product.use-case.ts**

![](images/clipboard-3836864521.png)
