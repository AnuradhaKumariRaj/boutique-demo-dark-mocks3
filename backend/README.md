# Premium Dark Django Admin

This backend adds a Django admin panel and JSON API for the `boutique-premium-dark` mockup.

## What it powers

- Hero slides
- Homepage text settings for hero, trust, testimonials, CTA, and contact sections
- Product collections
- Product image uploads
- Product ordering and active/inactive toggles
- Footer branding and contact details
- JSON API for the React frontend at `/api/storefront/`

## Run the backend

```bash
cd /Users/anuradha/Desktop/serializer/mocks/boutique-premium-dark/backend
source .venv/bin/activate
python manage.py runserver
```

Before running the backend, update `.env` with your real Postgres details:

```bash
DATABASE_URL=postgresql://db_user:db_password@db_host:5432/db_name
SECRET_KEY=<a new long random secret>
DEBUG=True
ALLOWED_HOSTS=*
CSRF_TRUSTED_ORIGINS=
```

Keep `.env` private because it contains credentials.

Open:

- Admin: `http://127.0.0.1:8000/admin/`
- API: `http://127.0.0.1:8000/api/storefront/`

## Create an admin user

```bash
cd /Users/anuradha/Desktop/serializer/mocks/boutique-premium-dark/backend
source .venv/bin/activate
python manage.py createsuperuser
```

## Demo data

The backend has already been migrated and seeded once in this workspace. If you want to reseed it:

```bash
cd /Users/anuradha/Desktop/serializer/mocks/boutique-premium-dark/backend
source .venv/bin/activate
python manage.py seed_demo_content
```

## Run the premium dark frontend

In a separate terminal:

```bash
cd /Users/anuradha/Desktop/serializer/mocks/boutique-premium-dark
npm run dev
```

The frontend will automatically try to read from:

`http://127.0.0.1:8000/api/storefront/`

If the Django backend is not running, the frontend falls back to the existing static data.

## Note about uploads

This setup uses `FileField` for image uploads so it can run without Pillow in this environment. You can still upload image files normally through Django admin.

## Deploy on Render with Postgres

Create a Render Postgres database first, then create a Python Web Service for this backend.

Use these service settings:

```bash
Build Command: ./build.sh
Start Command: gunicorn config.wsgi:application
```

Add these environment variables in Render:

```bash
DATABASE_URL=<your Render Postgres internal database URL>
SECRET_KEY=<a new long random secret>
DEBUG=False
ALLOWED_HOSTS=<your-backend-name>.onrender.com
CSRF_TRUSTED_ORIGINS=https://<your-backend-name>.onrender.com
```

The backend requires `DATABASE_URL` and uses Postgres for local and deployed runs.

After the first deploy, open the Render shell or run locally against the Render database if needed:

```bash
python manage.py createsuperuser
python manage.py seed_demo_content
```
