# School Website Backend API

A simple backend API for a school website built with Node.js, Express, and MySQL.

## Version

- API Version: v1
- Node.js: Express 5.1.0
- Database: MySQL

## Features

- JWT Authentication (login with token)
- Swagger API Documentation
- File Upload (images and PDFs)
- Image Processing with Sharp
- CORS enabled
- Error Handling
- Password Hashing with bcrypt

## Technologies Used

- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- Multer (file upload)
- Sharp (image processing)
- Swagger (API docs)
- bcrypt (password hashing)

## What This Project Does

This is a REST API for managing a school website. It handles:

- Admin authentication (login)
- Notices and announcements
- Events
- Photo gallery
- Team members (teachers & committee)
- Results
- Vacancies/Jobs
- Blogs
- Achievements
- Home page sliders, FAQs, and reviews

Server runs on: http://localhost:3000

API Docs: http://localhost:3000/api-docs

---

## Swagger API Docs

Open http://localhost:3000/api-docs to see all API documentation with Swagger UI.

You can test all APIs directly from Swagger.

## API Endpoints

Base URL: `/api/v1`

### Auth

- `POST /auth/login` - Login
- `GET /auth/me` - Get current admin (need token)

### Notices

- `GET /notices` - Get all notices
- `GET /notices/:id` - Get one notice
- `GET /notices/categories` - Get categories
- `GET /notices/category/:category_id` - Get notices by category
- `POST /notices` - Create notice (need token)
- `PATCH /notices/:id` - Update notice (need token)
- `DELETE /notices/:id` - Delete notice (need token)
- `POST /notices/categories` - Create category (need token)
- `PATCH /notices/categories/:id` - Update category (need token)
- `DELETE /notices/categories/:id` - Delete category (need token)

### Events

- `GET /events` - Get all events
- `GET /events/:id` - Get one event
- `POST /events` - Create event (need token)
- `PATCH /events/:id` - Update event (need token)
- `DELETE /events/:id` - Delete event (need token)

### Gallery

- `GET /gallery` - Get all images
- `GET /gallery/categories` - Get categories
- `GET /gallery/category/:category_id` - Get images by category
- `POST /gallery` - Add image (need token)
- `DELETE /gallery/:id` - Delete image (need token)

### Team

- `GET /team` - Get all members
- `GET /team/:id` - Get one member
- `POST /team` - Add member (need token)
- `PATCH /team/:id` - Update member (need token)
- `DELETE /team/:id` - Delete member (need token)

### Results

- `GET /results` - Get all results
- `GET /results/:id` - Get one result
- `POST /results` - Create result (need token)
- `PATCH /results/:id` - Update result (need token)
- `DELETE /results/:id` - Delete result (need token)

### Vacancies

- `GET /vacancies` - Get all vacancies
- `GET /vacancies/:id` - Get one vacancy
- `GET /vacancies/categories` - Get categories
- `GET /vacancies/category/:category_id` - Get vacancies by category
- `POST /vacancies` - Create vacancy (need token)
- `PATCH /vacancies/:id` - Update vacancy (need token)
- `DELETE /vacancies/:id` - Delete vacancy (need token)

### Blogs

- `GET /blogs` - Get all blogs
- `GET /blogs/:id` - Get one blog
- `GET /blogs/categories` - Get categories
- `GET /blogs/category/:category_id` - Get blogs by category
- `POST /blogs` - Create blog (need token)
- `PATCH /blogs/:id` - Update blog (need token)
- `DELETE /blogs/:id` - Delete blog (need token)
- `POST /blogs/categories` - Create category (need token)
- `PATCH /blogs/categories/:id` - Update category (need token)
- `DELETE /blogs/categories/:id` - Delete category (need token)

### Achievements

- `GET /achievements` - Get all achievements
- `GET /achievements/:id` - Get one achievement
- `POST /achievements` - Create achievement (need token)
- `PATCH /achievements/:id` - Update achievement (need token)
- `DELETE /achievements/:id` - Delete achievement (need token)

### Home (Sliders, FAQs, Reviews)

- `GET /home/sliders` - Get all sliders
- `GET /home/sliders/:id` - Get one slider
- `POST /home/sliders` - Create slider (need token)
- `PUT /home/sliders/:id` - Update slider (need token)
- `DELETE /home/sliders/:id` - Delete slider (need token)

- `GET /home/faqs` - Get all FAQs
- `GET /home/faqs/:id` - Get one FAQ
- `POST /home/faqs` - Create FAQ (need token)
- `PUT /home/faqs/:id` - Update FAQ (need token)
- `DELETE /home/faqs/:id` - Delete FAQ (need token)

- `GET /home/reviews` - Get all reviews
- `POST /home/reviews` - Submit review
- `PUT /home/reviews/:id` - Update review (need token)
- `DELETE /home/reviews/:id` - Delete review (need token)

## Swagger API Docs

Open http://localhost:3000/api-docs to see all API documentation with Swagger UI.

You can test all APIs directly from Swagger.

## File Uploads

Files are saved in `uploads/` folder:

- Slider images: `uploads/sliders/images/`
- Notice files: `uploads/notices/pdfs/` and `uploads/notices/images/`
- Gallery images: `uploads/gallery/images/`
- Result files: `uploads/documents/pdfs/` and `uploads/documents/images/`

Access uploaded files: http://localhost:3000/uploads/...

## Setup

1. Run `npm install`
2. Create `.env` file with database info
3. Run SQL file in MySQL
4. Run `npm run dev`

## Author

Manish Mandal
