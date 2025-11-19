# Frontend Angular - Parcial Desarrollo Web

Este es el frontend del proyecto desarrollado con Angular 20.

## Estructura del Proyecto

```
src/app/
├── core/
│   ├── config/
│   │   └── api.config.ts      # Configuración de la URL del backend
│   ├── models/
│   │   └── api-response.model.ts  # Modelos genéricos para respuestas de la API
│   └── services/
│       └── api.service.ts     # Servicio base para peticiones HTTP
├── shared/
│   └── components/
│       ├── loading/           # Componente de carga
│       └── error-message/     # Componente de mensajes de error
├── features/
│   └── home/                  # Componente de inicio
└── app.*                      # Componente principal y configuración
```

## Configuración del Backend

La URL del backend se configura en `src/app/core/config/api.config.ts`. Por defecto está configurada como:

```typescript
baseUrl: 'http://localhost:8080/api'
```

**Ajusta esta URL según la configuración de tu backend.**

## Instalación

```bash
npm install
```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm start
# o
ng serve
```

La aplicación estará disponible en `http://localhost:4200/`

## Uso del Servicio API

El servicio `ApiService` proporciona métodos genéricos para realizar peticiones HTTP:

```typescript
import { ApiService } from './core/services/api.service';

constructor(private apiService: ApiService) {}

// GET
this.apiService.get<MiModelo>('/endpoint').subscribe(data => {
  console.log(data);
});

// POST
this.apiService.post<MiModelo>('/endpoint', body).subscribe(data => {
  console.log(data);
});

// PUT
this.apiService.put<MiModelo>('/endpoint', body).subscribe(data => {
  console.log(data);
});

// DELETE
this.apiService.delete<MiModelo>('/endpoint').subscribe(data => {
  console.log(data);
});
```

## Componentes Compartidos

### LoadingComponent
Muestra un indicador de carga:

```html
<app-loading></app-loading>
```

### ErrorMessageComponent
Muestra mensajes de error:

```html
<app-error-message [message]="errorMessage"></app-error-message>
```

## Funcionalidades Implementadas

### Gestión de Clínicas

- **Listar Clínicas**: Visualiza todas las clínicas registradas en el sistema
- **Registrar Clínicas**: Formulario para registrar nuevas clínicas con validación

### Endpoints Utilizados

- `GET /api/clinicas` - Obtener todas las clínicas
- `POST /api/clinicas` - Registrar una nueva clínica

## Configuración del Backend

1. **Ajustar la URL del backend**: Modifica `src/app/core/config/api.config.ts` con la URL correcta de tu backend (por defecto: `http://localhost:8080/api`)

2. **Configurar CORS**: Asegúrate de que el backend tenga configurado CORS para permitir peticiones desde `http://localhost:4200`

3. **Estructura esperada del backend**:
   - El endpoint debe aceptar peticiones GET en `/api/clinicas` y retornar un array de clínicas
   - El endpoint debe aceptar peticiones POST en `/api/clinicas` con el siguiente formato:
     ```json
     {
       "nombre": "string",
       "direccion": "string",
       "telefono": "string (opcional)",
       "email": "string (opcional)"
     }
     ```

## Estructura de Clínicas

El modelo de Clínica incluye:
- `id`: Identificador único (generado por el backend)
- `nombre`: Nombre de la clínica (requerido)
- `direccion`: Dirección de la clínica (requerido)
- `telefono`: Teléfono de contacto (opcional)
- `email`: Email de contacto (opcional)

## Build

Para compilar el proyecto para producción:

```bash
npm run build
```

Los archivos compilados se generarán en la carpeta `dist/`.

## Testing

Para ejecutar las pruebas unitarias:

```bash
npm test
```

## Tecnologías Utilizadas

- Angular 20
- TypeScript
- RxJS
- Angular Router
- Angular HttpClient
