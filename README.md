# Front-End Test - React + Vite

Este proyecto es una mini aplicación web que permite explorar una lista de productos móviles, ver sus detalles y simular su compra mediante un carrito.

---

## Tecnologías Utilizadas

- React 18 (con Vite)
- Vite (entorno moderno de desarrollo y bundler)
- Material UI (MUI) (para diseño visual y componentes UI)
- React Router DOM (SPA routing)
- Axios (consumo de API REST)
- Jest + React Testing Library (test unitarios y de comportamiento)
- ESLint + Prettier (estándares y formateo automático)
- LocalStorage API (persistencia de carrito de compras)
- Hooks personalizados 
- Context API (para estado global del carrito)

---

## Estructura del Proyecto

```bash
src/
├── api/               # Módulos de conexión con API REST
├── components/        # Componentes reutilizables
├── context/           # Contexto global para el carrito
├── hooks/             # Hooks personalizados
├── pages/             # Vistas de la app
├── routes/            # Definiciones de rutas con React Router
├── styles/            # Estilos CSS 
├── utils/             # Utilidades (cache)
└── tests/             # Test unitarios reflejando estructura de src/


## Instrucciones para Ejecutar la aplicación

# 1. Clona el repositorio
git clone https://github.com/santiaveiro/front-end-test
cd front-end-test

# 2. Instala dependencias
npm install

# 3. Ejecuta en modo desarrollo (entorno Vite)
npm run dev

# (Opcional) Compila para producción
npm run build

# Ejecuta los tests
npm run test

# (Opcional) Ejecuta ESLint para verificación del código
npm run lint


La aplicación se ejecutará por defecto en:

http://localhost:5173


## Cobertura de Testing

Los tests cubren todos los aspectos principales de la app:

- **APIs:** (`apiClient`, `products`)
- **Componentes:** (`Header`, `ProductCard`)
- **Páginas:** (`ProductList`, `ProductDetails`, `Cart`)
- **Contexto global:** (`CartContext`)
- **Hooks personalizados:** (`useSearchFilter`)
- **Utilidades:** (`cache.js`)

Ejecútalos con el comando:

npm run test

## Git Flow Aplicado

Durante el desarrollo se utilizó una metodología basada en Git Flow, que facilita la organización y control de versiones en el proyecto:

- **main**: rama principal estable que refleja el estado de producción.
- **feature/***: ramas dedicadas a funcionalidades específicas.  
  Ejemplo: `feature/testing-setup`
- **fix/***: ramas utilizadas para aplicar correcciones menores o ajustes visuales.  
  Ejemplo: `fix/ui-final-touch`

Se mantuvo una estructura de commits **atómicos y bien documentados**, siguiendo buenas prácticas de control de cambios.

