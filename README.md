# Document Classification Management System

Sistem complet de management și clasificare a documentelor electronice cu integrare Google Drive.

## Caracteristici

✅ **Backend Node.js/Express**
- REST API cu operații CRUD complete
- Autentificare JWT cu middleware verifyToken
- Persistență date cu Sequelize + SQLite
- Endpoints protejate pentru documente
- Analytics și statistici pe categorii

✅ **Frontend React + Vite**
- Single Page Application (SPA) funcțională
- React Router pentru navigare
- Context API pentru state management
- Componente reutilizabile
- Interfață responsive cu CSS modern
- Protected routes pentru utilizatori autentificați

✅ **Siguranță și Persistență**
- Autentificare cu token JWT
- Parolele sunt hash-uite cu bcrypt
- Date persistente în baza de date SQLite
- Protecție CORS activă

✅ **Clasificare Documente**
- Categorii personalizate
- Niveluri de clasificare: public, internal, confidential
- Numărare înregistrări per document
- Filtrare și căutare

## Structură Proiect

```
├── server/
│   ├── index.js (punct de intrare)
│   ├── package.json
│   ├── database/
│   │   ├── server.js (config Sequelize)
│   │   └── models/
│   │       ├── User.js
│   │       ├── Document.js
│   │       └── index.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── user.routes.js
│   │   └── document.routes.js
│   ├── middleware/
│   │   └── verifyToken.js
│   └── services/
│       └── googleDriveService.js (placeholder)
│
└── client/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── components/
    │   │   ├── DocumentList.jsx
    │   │   ├── DocumentForm.jsx
    │   │   ├── Navbar.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   └── Documents.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx
    │   │   └── DocumentContext.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── Navbar.css
    │   │   ├── Auth.css
    │   │   ├── Documents.css
    │   │   ├── DocumentForm.css
    │   │   └── DocumentList.css
    │   └── index.css
```

## Instalare și Rulare

### Backend

```bash
cd server
npm install
npm run dev
```

Server va rula pe **http://localhost:3000**

### Frontend

```bash
cd client
npm install
npm run dev
```

Client va rula pe **http://localhost:5173**

## Endpoints API

### Autentificare
- `POST /auth/login` - Login utilizator
- `POST /users` - Înregistrare utilizator

### Documente (toate necesită token JWT)
- `GET /documents` - Obțineți toate documentele
- `GET /documents/:id` - Obțineți document după ID
- `POST /documents` - Creați document nou
- `PUT /documents/:id` - Actualizați document
- `DELETE /documents/:id` - Ștergeți document
- `GET /documents/analytics/by-category` - Statistici pe categorii

## Utilizare

1. **Înregistrare**: Accesați login page, selectați Register
2. **Login**: Introduceți email și parolă
3. **Management documente**: 
   - Vizualizați lista de documente
   - Adăugați documente noi cu clasificare
   - Editați și ștergeți documente existente
   - Filtrați după nivel de clasificare

## Credențiale Exemplu

```json
Email: test@example.com
Password: password123
Name: Test User
```

## Variabile Mediu

## Tehnologii Utilizate

**Backend:**
- Node.js
- Express
- Sequelize ORM
- SQLite
- JWT Authentication
- Bcrypt

**Frontend:**
- React 18
- React Router v6
- Axios
- Vite
- CSS3
