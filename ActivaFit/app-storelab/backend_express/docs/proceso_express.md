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
