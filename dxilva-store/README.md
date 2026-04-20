# D'XILVA STORE - E-commerce Moderno

Arquitectura completa para un e-commerce moderno utilizando Next.js 14, Supabase y múltiples pasarelas de pago.

## 🚀 Características Principales

### Funcionalidades Implementadas
- ✅ Autenticación con Supabase (Email/Password)
- ✅ Dashboard para vendedores y administradores
- ✅ Catálogo público con filtros por categoría
- ✅ Carrito de compras persistente (Zustand)
- ✅ Checkout con QvaPay, Transfermóvil, Enzona y Stripe
- ✅ Webhook para confirmación de pagos
- ✅ Panel de administración con estadísticas
- ✅ SEO avanzado con metadata dinámica
- ✅ Diseño responsive con TailwindCSS
- ✅ Modo oscuro/claro
- ✅ Animaciones suaves con Framer Motion

### Identidad Visual D'XILVA
- **Colores:**
  - Negro: `#000000`
  - Amarillo: `#F7BB3C`
  - Blanco: `#FFFFFF`
- **Tipografía:** Cinzel (títulos), Inter (texto)
- **Estilo:** Moderno, tecnológico, minimalista

## 📁 Estructura del Proyecto

```
dxilva-store/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   ├── (dashboard)/
│   │   │   ├── admin/
│   │   │   ├── seller/
│   │   │   └── orders/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   └── webhooks/qvapay/
│   │   ├── catalogo/
│   │   ├── producto/[slug]/
│   │   ├── carrito/
│   │   ├── checkout/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   └── ProductGrid.tsx
│   │   ├── dashboard/
│   │   │   ├── DashboardSidebar.tsx
│   │   │   └── DashboardStats.tsx
│   │   └── payment/
│   │       └── PaymentButton.tsx
│   ├── hooks/
│   │   └── useCartStore.ts
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── utils.ts
│   │   └── qvapay.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── database.ts
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── public/
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
cd dxilva-store
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Editar `.env.local` con tus credenciales:
```env
NEXT_PUBLIC_SUPABASE_URL=tu-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key

QVAPAY_APP_ID=tu-app-id
QVAPAY_SECRET_KEY=tu-secret-key
QVAPAY_WEBHOOK_SECRET=tu-webhook-secret

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configurar base de datos
Ejecuta el script SQL en tu proyecto de Supabase:
```bash
# Opción 1: Desde Supabase Dashboard
# Copia el contenido de supabase/migrations/001_initial_schema.sql
# y ejecútalo en el SQL Editor del dashboard

# Opción 2: Usando Supabase CLI
npx supabase db push
```

### 5. Iniciar servidor de desarrollo
```bash
npm run dev
```

Visita http://localhost:3000

## 💳 Pasarelas de Pago

### QvaPay
1. Regístrate en [QvaPay](https://qvapay.com)
2. Obtén tus credenciales (App ID, Secret Key)
3. Configura el webhook: `https://tudominio.com/api/webhooks/qvapay`

### Transfermóvil / Enzona
- Integración mediante QR o botones de pago
- Ver documentación oficial de cada servicio

### Stripe (Internacional)
1. Regístrate en [Stripe](https://stripe.com)
2. Configura las claves API en `.env.local`
3. Implementa los endpoints de Stripe Checkout

## 📊 Base de Datos

El esquema incluye:
- **profiles**: Extensión de auth.users con roles
- **products**: Catálogo de productos
- **categories**: Categorías de productos
- **orders**: Órdenes de compra
- **order_items**: Items de cada orden
- **carts & cart_items**: Carritos de compra
- **reviews**: Reseñas de productos
- **wishlists**: Listas de deseos
- **coupons**: Cupones de descuento

## 🔐 Autenticación

La autenticación se maneja con:
- Supabase Auth (email/password)
- NextAuth.js para gestión de sesiones
- Roles: customer, seller, admin

## 🎨 Componentes Principales

### Navbar
- Navegación responsive
- Búsqueda integrada
- Icono de carrito con contador
- Menú móvil animado

### ProductCard
- Imagen con hover effects
- Badges (descuento, destacado, agotado)
- Botón de wishlist
- Quick add to cart

### DashboardSidebar
- Navegación lateral colapsable
- Diferentes menús según rol
- Indicador de ruta activa

### PaymentButton
- Soporte múltiple de pasarelas
- Estados de carga y error
- Animaciones con Framer Motion

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

Configura las variables de entorno en el dashboard de Vercel.

### Consideraciones
1. **Supabase**: Ya está en la nube, solo configura las URLs
2. **Webhooks**: Asegúrate de que tu dominio sea accesible públicamente
3. **Imágenes**: Configura los dominios permitidos en `next.config.mjs`

## 📝 Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint
npm run db:migrate   # Migraciones de base de datos
```

## 🔒 Seguridad

- Row Level Security (RLS) habilitado en todas las tablas
- Validación de webhooks con firmas
- Variables de entorno para datos sensibles
- Middleware para rutas protegidas

## 🌐 Internacionalización (i18n)

El proyecto está preparado para i18n usando next-intl:
- Español (predeterminado)
- Inglés

## 📈 SEO

- Metadata dinámica por página
- OpenGraph tags
- Twitter Cards
- Sitemap automático (generar con next-sitemap)
- Robots.txt configurado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: info@dxilvastore.com
- Documentación: [Wiki del proyecto]

---

**D'XILVA Store** - Construido con ❤️ usando Next.js 14 y Supabase
