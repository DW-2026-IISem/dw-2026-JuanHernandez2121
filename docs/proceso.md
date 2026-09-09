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
