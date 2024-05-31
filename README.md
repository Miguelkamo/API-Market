# API-Market

## Endpoints

### Obtener todos los posts

- **URL:** `/api/posts`
- **Método:** `GET`
- **Descripción:** Obtiene todos los posts.

### Crear un nuevo post

- **URL:** `/api/posts`
- **Método:** `POST`
- **Descripción:** Crea un nuevo post.
- **Body Params:**
  - `title` (String, requerido)
  - `content` (String, requerido)

### Obtener un post por ID

- **URL:** `/api/posts/:id`
- **Método:** `GET`
- **Descripción:** Obtiene un post por su ID.

### Actualizar un post

- **URL:** `/api/posts/:id`
- **Método:** `PATCH`
- **Descripción:** Actualiza un post por su ID.
- **Body Params:**
  - `title` (String, opcional)
  - `content` (String, opcional)

### Eliminar un post

- **URL:** `/api/posts/:id`
- **Método:** `DELETE`
- **Descripción:** Elimina un post por su ID.
