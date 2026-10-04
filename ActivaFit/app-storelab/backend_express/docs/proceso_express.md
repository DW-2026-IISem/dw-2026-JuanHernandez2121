# **Manual — app-storelab-express**

# 

# **1. ISS-00 — Requisitos previos**

![](images/clipboard-1321157513.png)

# **2. ISS-01 — Esqueleto del proyecto**

## **2.2 Estructura de carpetas (features)**

![](images/clipboard-3029986986.png)

## **2.3 Dependencias base (Express + TypeScript)**

![](images/clipboard-575488437.png)

## **2.4 TypeScript (`tsconfig.json`)**

![](images/clipboard-791827079.png)

## **2.5 Servidor y App (esqueleto HTTP)**

### **2.5.1 `src/server.ts`**

![](images/clipboard-3082927853.png)

### **2.5.2 `src/config/index.ts` (esqueleto)**

![](images/clipboard-2391363093.png)

# **3. ISS-02 — Infraestructura de base de datos**

## **3.2 Configuración Sequelize (`database/db.ts`)**

![](images/clipboard-1530252348.png)

## **3.3 Carpeta seeders (reservada)**

![](images/clipboard-3376259878.png)

# **4. ISS-03-A — Feature Client — fundación (modelo, esqueleto, HTTP, cableado)**

## **4.1 Modelo Client**

![](images/clipboard-2241345054.png)

## **4.2 Esqueleto controller / routes + carpeta HTTP**

![](images/clipboard-3340179267.png)

## **4.3 Agregador Routes + cableado en Config**

![](images/clipboard-2367671331.png)

# **5. ISS-03-B — Feature Client — GetAll y GetOne**

![](images/clipboard-417314586.png)

![](images/clipboard-2172827154.png)

# **6. ISS-03-C — Feature Client — Crear cliente**

![](images/clipboard-4083026285.png)

### **Rutas — PARCHE `client.routes.ts`**

![](images/clipboard-1903929686.png)

### **HTTP — archivo nuevo**

![](images/clipboard-3305515819.png)

### **Cierre del ISS**

![](images/clipboard-2151117829.png)

# **7. ISS-03-D — Feature Client — Update (PUT) y Update (PATCH)**

![](images/clipboard-1653635119.png)

### **Rutas — PARCHE `client.routes.ts`**

![](images/clipboard-3807988544.png)

### **HTTP — archivo nuevo**

![](images/clipboard-146009563.png)

### **Cierre del ISS**

![](images/clipboard-3924921925.png)

# **8. ISS-03-E — Feature Client — Eliminar (físico y lógico)**

![](images/clipboard-3835800169.png)

### **Rutas — PARCHE `client.routes.ts`**

![](images/clipboard-3000243181.png)

### **HTTP — archivo nuevo**

![](images/clipboard-2636762021.png)

### **Estado final Client (CRUD completo) — archivos consolidados**

![](images/clipboard-1475319441.png)

# **9. ISS-04 — Seeders con Faker (feature + runner externo)**

## **9.1 Seeder dentro del feature Client**

![](images/clipboard-2761820191.png)

## **9.2 SeedersRunner + conteos por entidad (`database/seeders`)**

### **9.2.1 Conteos**

![](images/clipboard-3009419263.png)

### **9.2.2 Runner**

![](images/clipboard-4186342172.png)

### **Cierre del ISS**

![](images/clipboard-86261357.png)

# **10. ISS-05 — Swagger / OpenAPI (feature + registry externo)**

![](images/clipboard-2006233592.png)

## **10.2 Registry externo + montaje en Config**

![](images/clipboard-574949129.png)

# 11. ISS-06 — Feature Plan

### 11.1 Modelo `plan.model.ts`

![](images/clipboard-2648708129.png)

### 11.2 Controller de PLAN

![](images/clipboard-4106731814.png)

### 11.3 Rutas de PLAN

![](images/clipboard-96103041.png)

### 11.3 HTTP — REST Client

![](images/clipboard-2313766303.png)

### 11.4 Cableado Routes + Config

![](images/clipboard-552076874.png)

### 11.5 Seeder de PLAN

![](images/clipboard-1909603546.png)

### 11.6 Swagger PLAN

![](images/clipboard-3793795573.png)

# 12. ISS-07 — Feature Membresía

### .1 Modelo Membresía

![](images/clipboard-2805190114.png)

### .2 Controller + Routes — Membresía

![](images/clipboard-2360424940.png)

### .3 HTTP — Membresía

![](images/clipboard-2414166898.png)

### **Verificación relación**

![](images/clipboard-3253784068.png)

# 13. ISS-08 — Entrenador

### .1 modelo entrenador

![](images/clipboard-2744777053.png)

### .2 controller entrenador

![](images/clipboard-2406484233.png)

### .3 servidor

![](images/clipboard-3614586349.png)

![](images/clipboard-4245742728.png)

# 14. ISS-09 — Rutina

### .1 modelo Rutina

![](images/clipboard-1590483952.png)

### .2 Controller Rutina

![](images/clipboard-446816721.png)

### .3 — Routes

![](images/clipboard-2291478105.png)

### Verificar compilación

![](images/clipboard-1754032909.png)

![](images/clipboard-922759109.png)

# 15. ISS-10 — Ejercicio

### .1 modelo Ejercicio

![](images/clipboard-1965944968.png)

### .2 Controller Ejercicio

![](images/clipboard-612573958.png)

### .3 — Routes

![](images/clipboard-1595826916.png)

### Compilar

![![](images/clipboard-3709411536.png)](images/clipboard-3784697965.png)

# 17. ISS-12 — Medición

### .1 modelo Medicion

![](images/clipboard-412587259.png)

### .2 Controller medicion

![](images/clipboard-3615042101.png)

### .3 — Routes

![](images/clipboard-2260688548.png)

### Compilar

![](images/clipboard-3560651293.png)

![](images/clipboard-113350618.png)

![](images/clipboard-54352869.png)

# **Unidad ISS-09 · Auth base (seguridad y modelos)**

## **Fase II: Auth con RBAC — ISS-09 — Base de seguridad compartida y modelos Auth**

## **18.1 Dependencias y variables de entorno**

![](images/clipboard-2733817.png)

## **18.2 `password.ts` — hash de contraseña y hashes de tokens**

![](images/clipboard-1682934699.png)

## **18.3 `jwt.ts` — firma y verificación del access token**

## ![](images/clipboard-3160086077.png) 

## **18.4 `resource-match.ts` — casar la petición con el recurso**

![](images/clipboard-246757760.png)

## **18.5 `auth-user.ts` — la identidad en `Request`**

![](images/clipboard-4115284332.png)

## **18.6 `error-response.ts` y PARCHE de `BaseController`**

![](images/clipboard-2467706156.png)

## **18.7 `swagger-security.ts` — seguridad reutilizable para OpenAPI**

![](images/clipboard-1698035125.png)

## **18.8 Los seis modelos Sequelize**

## ![](images/clipboard-3382259259.png) 

## **18.9 `rbac.associations.ts` — el grafo en un solo lugar**

![](images/clipboard-3685820212.png)

## **18.10 Cableado de modelos en `config` y `seeders`**

![](images/clipboard-4237970886.png)

# **Unidad ISS-10 · Feature Users (identidad y contraseña)**

## **19.1 DTOs del feature**

![](images/clipboard-2934436219.png)

## **19.2 Repository**

## ![](images/clipboard-1200684417.png) 

## **19.3 Service**

![](images/clipboard-1177860244.png)

## **19.4 Controller**

![](images/clipboard-4072866063.png)

## **19.5 Rutas (modalidad JWT + RBAC)**

![](images/clipboard-2624956741.png)

## **19.6 Seeder de usuarios canónicos**

![](images/clipboard-398823622.png)

## **19.7 Swagger del feature**

![](images/clipboard-2154768240.png)

## **19.8 Pruebas HTTP**

## ![](images/clipboard-3401713666.png)

# **Unidad ISS-11 · Features Roles y Resources**

## **20.1 Feature Roles — DTOs**

![](images/clipboard-4239343975.png)
