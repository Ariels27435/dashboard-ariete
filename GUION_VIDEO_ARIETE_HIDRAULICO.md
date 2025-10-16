# 🎥 GUIÓN PARA VIDEO - SISTEMA ARIETE HIDRÁULICO INTELIGENTE

**Duración:** 5 minutos  
**Autor:** Ariel Celico López de León  
**Fecha:** 2025  

---

## 📋 INFORMACIÓN GENERAL

### **Título del Proyecto:**
Sistema de Ariete Hidráulico Inteligente con Microservicios e IoT (Internet de las Cosas)

### **URLs del Sistema:**
- **Dashboard:** https://dashboard-ariete.vercel.app
- **Backend API:** https://backend-ariete.onrender.com
- **Repositorio:** https://github.com/Ariels27435/dashboard-ariete

---

## 🎬 ESTRUCTURA DEL VIDEO (5 MINUTOS)

### **INTRODUCCIÓN (30 segundos)**

> "Hola, soy Ariel Celico López de León y les presento mi **Sistema de Ariete Hidráulico Inteligente con IoT**. Este proyecto integra microcontroladores ESP32, sensores inteligentes y un dashboard web en tiempo real para monitorear y controlar sistemas hidráulicos de manera remota desde cualquier parte del mundo."

**Acción en pantalla:** Mostrar el dashboard principal con los tres sensores

---

### **1. MANEJO DE SEGURIDAD (1.5 minutos)**

#### **1.1 Seguridad de Datos (45 segundos)**

> "En cuanto a **seguridad**, el sistema implementa múltiples capas de protección:

> **Autenticación JWT:** Todos los accesos al dashboard requieren tokens de autenticación seguros.

> **API Keys:** Los dispositivos ESP32 se validan mediante claves API específicas para prevenir accesos no autorizados.

> **HTTPS:** Todas las comunicaciones están encriptadas usando certificados SSL, protegiendo los datos en tránsito.

> **Validación de Datos:** El backend valida todos los datos recibidos para prevenir inyecciones maliciosas.

> **Control de Acceso:** Sistema de roles con diferentes niveles de permisos (administrador, supervisor, operador)."

**Acción en pantalla:** Mostrar el panel de login y configuraciones de seguridad

#### **1.2 Seguridad Operacional (45 segundos)**

> "Para la **seguridad operacional**:

> **Alertas Automáticas:** El sistema genera alertas inmediatas cuando los valores están fuera de los rangos seguros.

> **Monitoreo Continuo:** Vigilancia las 24 horas de humedad, flujo y nivel de agua.

> **Logs de Eventos:** Registro completo de todas las operaciones para auditoría y trazabilidad.

> **Reconexión Automática:** El ESP32 se reconecta automáticamente en caso de falla de WiFi.

> **Respaldos en la Nube:** Los datos se almacenan de forma redundante en múltiples servidores."

**Acción en pantalla:** Mostrar alertas y logs del sistema

---

### **2. CORE DE LA SOLUCIÓN TECNOLÓGICA (2 minutos)**

#### **2.1 Arquitectura del Sistema (60 segundos)**

> "El **core tecnológico** se basa en una arquitectura de microservicios moderna:

> **Frontend (Dashboard Web):**
> - React 19 con Vite para rendimiento óptimo
> - Tailwind CSS para diseño responsive y profesional
> - Gráficas en tiempo real con actualización automática cada 5 segundos
> - Desplegado en Vercel para alta disponibilidad global

> **Backend (API):**
> - Node.js con Express para manejo eficiente de datos
> - Endpoints RESTful para comunicación estándar con ESP32
> - Sistema de datos en memoria para respuesta ultra-rápida
> - Desplegado en Render con escalabilidad automática

> **Dispositivos IoT (ESP32):**
> - Sensores analógicos de alta precisión para humedad y flujo
> - Sensor digital para detección de nivel de agua
> - Comunicación WiFi robusta con reconexión automática
> - Sistema de interrupciones para conteo preciso de pulsos"

**Acción en pantalla:** Mostrar diagrama de arquitectura y código fuente

#### **2.2 Flujo de Datos y Comunicación (60 segundos)**

> "El flujo de datos es completamente automatizado:

> **Captura:** Los sensores del ESP32 capturan datos cada 5 segundos.

> **Transmisión:** Los datos se envían vía WiFi HTTPS al backend en la nube.

> **Procesamiento:** El backend valida, almacena y procesa los datos en tiempo real.

> **Visualización:** El dashboard web se actualiza automáticamente mostrando los valores más recientes.

> **Acceso Universal:** El sistema es accesible desde cualquier dispositivo con internet: móviles, tablets, computadoras.

> **Escalabilidad:** La arquitectura permite agregar múltiples dispositivos ESP32 sin afectar el rendimiento."

**Acción en pantalla:** Mostrar el flujo de datos en tiempo real en el dashboard

---

### **3. CONTROLES E INDICADORES (1.5 minutos)**

#### **3.1 Indicadores Principales (90 segundos)**

> "El sistema muestra **tres indicadores críticos** para el monitoreo hidráulico:

> **Sensor de Humedad Ariete:**
> - **Rango de medición:** 0-100%
> - **Umbral de alerta:** 80%
> - **Actualización:** Cada 5 segundos
> - **Visualización:** Barra de progreso con códigos de color (verde: normal, amarillo: advertencia, rojo: crítico)
> - **Aplicación:** Monitoreo de humedad ambiental en sistemas hidráulicos

> **Sensor de Flujo Ariete:**
> - **Medición:** Litros por minuto (L/min)
> - **Precisión:** Basada en conteo de pulsos electromagnéticos
> - **Calibración:** 7.5 pulsos por litro para máxima precisión
> - **Rango:** 0-100 L/min
> - **Aplicación:** Control de caudal en sistemas de bombeo

> **Sensor de Nivel Ariete:**
> - **Estados:** 0% (tanque vacío) / 100% (tanque lleno)
> - **Tipo:** Sensor digital con resistencia pull-up
> - **Respuesta:** Instantánea ante cambios de nivel
> - **Aplicación:** Control de nivel en depósitos y tanques de almacenamiento"

**Acción en pantalla:** Mostrar cada sensor individualmente con sus valores

#### **3.2 Controles del Sistema (30 segundos)**

> "**Controles Avanzados del Sistema:**

> **Dashboard Responsive:** Interfaz adaptativa que funciona perfectamente en cualquier dispositivo.

> **Historial de Datos:** Gráficas temporales con datos históricos para análisis de tendencias.

> **Configuración de Umbrales:** Personalización de alertas según las necesidades específicas.

> **Exportación de Reportes:** Generación de reportes en formato PDF para análisis detallado.

> **Características Técnicas:**
> - **Latencia:** Menos de 5 segundos entre captura y visualización
> - **Disponibilidad:** 99.9% gracias a servicios en la nube
> - **Escalabilidad:** Soporte para múltiples dispositivos ESP32 simultáneos
> - **Compatibilidad:** Funciona en todos los navegadores modernos"

**Acción en pantalla:** Mostrar diferentes vistas del dashboard y configuraciones

---

### **DEMOSTRACIÓN EN VIVO (30 segundos)**

> "Ahora les muestro el sistema funcionando en tiempo real..."

**[Mostrar pantalla del dashboard con datos actualizándose automáticamente]**

> "Como pueden ver, los valores se actualizan automáticamente cada 5 segundos. Este es el **Sistema de Ariete Hidráulico Inteligente** - una solución completa de IoT para monitoreo hidráulico remoto, desarrollado con tecnologías modernas y desplegado en la nube para máxima disponibilidad."

**Acción en pantalla:** Zoom en los valores cambiando en tiempo real

---

## 📋 CHECKLIST PARA LA GRABACIÓN

### **Preparación Previa:**
- [ ] Dashboard funcionando con datos reales del ESP32
- [ ] ESP32 conectado y enviando datos continuamente
- [ ] Pantalla limpia del navegador sin pestañas innecesarias
- [ ] Audio claro y sin ruido de fondo
- [ ] Iluminación adecuada para la grabación
- [ ] Resolución de pantalla optimizada (1920x1080 recomendado)

### **Durante la Grabación:**
- [ ] Hablar pausadamente y con claridad
- [ ] Mostrar el dashboard funcionando en tiempo real
- [ ] Explicar cada componente técnico de manera comprensible
- [ ] Demostrar la actualización automática de datos
- [ ] Mencionar las URLs del sistema cuando corresponda
- [ ] Mantener el foco en la pantalla del dashboard

### **Post-Producción:**
- [ ] Verificar que la duración sea exactamente 5 minutos
- [ ] Asegurar que el audio sea claro y audible
- [ ] Confirmar que se muestran todos los elementos requeridos
- [ ] Incluir créditos con información del proyecto

---

## 🎯 PUNTOS CLAVE A DESTACAR

### **Innovación Tecnológica:**
- Integración de IoT con microservicios
- Dashboard web responsive en tiempo real
- Arquitectura escalable en la nube

### **Funcionalidad:**
- Monitoreo continuo 24/7
- Alertas automáticas
- Acceso remoto desde cualquier dispositivo

### **Seguridad:**
- Autenticación JWT
- Comunicación HTTPS encriptada
- Validación de datos y control de acceso

### **Escalabilidad:**
- Soporte para múltiples dispositivos
- Servicios en la nube para alta disponibilidad
- Arquitectura modular y extensible

---

## 📞 INFORMACIÓN DE CONTACTO

**Desarrollador:** Ariel Celico López de León  
**Proyecto:** Sistema de Ariete Hidráulico Inteligente  
**Tecnologías:** React, Node.js, ESP32, IoT, Microservicios  
**Despliegue:** Vercel + Render + MongoDB Atlas  

---

*Este guión está diseñado para cumplir con los requisitos específicos de mostrar manejo de seguridad, core tecnológico y controles/indicadores del sistema, con una duración total de 5 minutos.*
