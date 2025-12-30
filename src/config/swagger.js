const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'School Site Backend API',
    version: '1.0.0',
  },
  servers: [
    { url: 'http://localhost:5000' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/api/v1/auth/login': {
      post: {
        tags: ['Auth'],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Login successful' },
          '401': { description: 'Invalid credentials' },
        },
      },
    },
    '/api/v1/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get Current Admin',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'Success' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/home/sliders': {
      get: {
        tags: ['Sliders'],
        summary: 'Get All Sliders',
        parameters: [
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Sliders'],
        summary: 'Create Slider',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['image'],
                properties: {
                  image: { type: 'string', format: 'binary' },
                  title: { type: 'string' },
                  display_order: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/home/sliders/{id}': {
      get: {
        tags: ['Sliders'],
        summary: 'Get Slider by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not found' },
        },
      },
      put: {
        tags: ['Sliders'],
        summary: 'Update Slider',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  image: { type: 'string', format: 'binary' },
                  title: { type: 'string' },
                  display_order: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Sliders'],
        summary: 'Delete Slider',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/home/faqs': {
      get: {
        tags: ['FAQs'],
        summary: 'Get All FAQs',
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['FAQs'],
        summary: 'Create FAQ',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['question', 'answer'],
                properties: {
                  question: { type: 'string' },
                  answer: { type: 'string' },
                  display_order: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/home/faqs/{id}': {
      get: {
        tags: ['FAQs'],
        summary: 'Get FAQ by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not found' },
        },
      },
      put: {
        tags: ['FAQs'],
        summary: 'Update FAQ',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  question: { type: 'string' },
                  answer: { type: 'string' },
                  display_order: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['FAQs'],
        summary: 'Delete FAQ',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/home/reviews': {
      get: {
        tags: ['Reviews'],
        summary: 'Get All Reviews',
        parameters: [
          { in: 'query', name: 'status', schema: { type: 'string', enum: ['pending', 'approved'] } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Reviews'],
        summary: 'Submit Review',
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['name', 'review_text'],
                properties: {
                  name: { type: 'string' },
                  review_text: { type: 'string' },
                  position: { type: 'string' },
                  image: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: { '201': { description: 'Created' } },
      },
    },
    '/api/v1/home/reviews/{id}': {
      put: {
        tags: ['Reviews'],
        summary: 'Update Review Status',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', enum: ['pending', 'approved'] },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Reviews'],
        summary: 'Delete Review',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/team': {
      get: {
        tags: ['Team'],
        summary: 'Get All Team Members',
        parameters: [
          { in: 'query', name: 'role', schema: { type: 'string', enum: ['teacher', 'committee'] } },
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Team'],
        summary: 'Create Team Member',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['role', 'name', 'number', 'position'],
                properties: {
                  role: { type: 'string', enum: ['teacher', 'committee'] },
                  name: { type: 'string' },
                  number: { type: 'string' },
                  position: { type: 'string' },
                  email: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/team/{id}': {
      get: {
        tags: ['Team'],
        summary: 'Get Team Member by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not found' },
        },
      },
      patch: {
        tags: ['Team'],
        summary: 'Update Team Member',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  role: { type: 'string', enum: ['teacher', 'committee'] },
                  name: { type: 'string' },
                  number: { type: 'string' },
                  position: { type: 'string' },
                  email: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Team'],
        summary: 'Delete Team Member',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/events': {
      get: {
        tags: ['Events'],
        summary: 'Get All Events',
        parameters: [
          { in: 'query', name: 'category', schema: { type: 'string', enum: ['Monthly', 'Yearly'] } },
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Events'],
        summary: 'Create Event',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['category', 'title', 'event_date'],
                properties: {
                  category: { type: 'string', enum: ['Monthly', 'Yearly'] },
                  title: { type: 'string' },
                  event_date: { type: 'string', format: 'date' },
                  description: { type: 'string' },
                  pdf: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/events/{id}': {
      get: {
        tags: ['Events'],
        summary: 'Get Event by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not found' },
        },
      },
      patch: {
        tags: ['Events'],
        summary: 'Update Event',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  category: { type: 'string', enum: ['Monthly', 'Yearly'] },
                  title: { type: 'string' },
                  event_date: { type: 'string', format: 'date' },
                  description: { type: 'string' },
                  pdf: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Events'],
        summary: 'Delete Event',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/results': {
      get: {
        tags: ['Results'],
        summary: 'Get All Results',
        parameters: [
          { in: 'query', name: 'category', schema: { type: 'string', enum: ['Test', 'Final'] } },
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Results'],
        summary: 'Create Result',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['title', 'category', 'published_date', 'attachment'],
                properties: {
                  title: { type: 'string' },
                  category: { type: 'string', enum: ['Test', 'Final'] },
                  published_date: { type: 'string', format: 'date' },
                  attachment: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/results/{id}': {
      get: {
        tags: ['Results'],
        summary: 'Get Result by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not found' },
        },
      },
      patch: {
        tags: ['Results'],
        summary: 'Update Result',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  category: { type: 'string', enum: ['Test', 'Final'] },
                  published_date: { type: 'string', format: 'date' },
                  attachment: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Results'],
        summary: 'Delete Result',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/vacancies': {
      get: {
        tags: ['Vacancies'],
        summary: 'Get All Vacancies',
        parameters: [
          { in: 'query', name: 'status', schema: { type: 'string', enum: ['open', 'closed', 'pending'] } },
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Vacancies'],
        summary: 'Create Vacancy',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'description', 'posted_date'],
                properties: {
                  category_id: { type: 'integer' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  application_deadline: { type: 'string', format: 'date' },
                  posted_date: { type: 'string', format: 'date' },
                  status: { type: 'string', enum: ['open', 'closed', 'pending'] },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/vacancies/categories': {
      get: {
        tags: ['Vacancies'],
        summary: 'Get Vacancy Categories',
        responses: { '200': { description: 'Success' } },
      },
    },
    '/api/v1/vacancies/category/{category_id}': {
      get: {
        tags: ['Vacancies'],
        summary: 'Get Vacancies by Category',
        parameters: [
          { in: 'path', name: 'category_id', required: true, schema: { type: 'integer' } },
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
    },
    '/api/v1/vacancies/{id}': {
      get: {
        tags: ['Vacancies'],
        summary: 'Get Vacancy by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not found' },
        },
      },
      patch: {
        tags: ['Vacancies'],
        summary: 'Update Vacancy',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  category_id: { type: 'integer' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  application_deadline: { type: 'string', format: 'date' },
                  posted_date: { type: 'string', format: 'date' },
                  status: { type: 'string', enum: ['open', 'closed', 'pending'] },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Vacancies'],
        summary: 'Delete Vacancy',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/gallery': {
      get: {
        tags: ['Gallery'],
        summary: 'Get All Gallery Items',
        parameters: [
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Gallery'],
        summary: 'Add Gallery Item',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['category_id', 'image'],
                properties: {
                  category_id: { type: 'integer' },
                  image: { type: 'string', format: 'binary' },
                  caption: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/gallery/categories': {
      get: {
        tags: ['Gallery'],
        summary: 'Get Gallery Categories',
        responses: { '200': { description: 'Success' } },
      },
    },
    '/api/v1/gallery/category/{category_id}': {
      get: {
        tags: ['Gallery'],
        summary: 'Get Gallery Items by Category',
        parameters: [
          { in: 'path', name: 'category_id', required: true, schema: { type: 'integer' } },
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
    },
    '/api/v1/gallery/{id}': {
      delete: {
        tags: ['Gallery'],
        summary: 'Delete Gallery Item',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/notices': {
      get: {
        tags: ['Notices'],
        summary: 'Get All Notices',
        parameters: [
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Notices'],
        summary: 'Create Notice',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['title', 'notice_date'],
                properties: {
                  title: { type: 'string' },
                  notice_date: { type: 'string', format: 'date' },
                  category_id: { type: 'integer' },
                  attachment: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/notices/categories': {
      get: {
        tags: ['Notices'],
        summary: 'Get Notice Categories',
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Notices'],
        summary: 'Create Notice Category',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['category_name'],
                properties: {
                  category_name: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/notices/category/{category_id}': {
      get: {
        tags: ['Notices'],
        summary: 'Get Notices by Category',
        parameters: [
          { in: 'path', name: 'category_id', required: true, schema: { type: 'integer' } },
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
    },
    '/api/v1/notices/{id}': {
      get: {
        tags: ['Notices'],
        summary: 'Get Notice by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not found' },
        },
      },
      patch: {
        tags: ['Notices'],
        summary: 'Update Notice',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  notice_date: { type: 'string', format: 'date' },
                  category_id: { type: 'integer' },
                  attachment: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Notices'],
        summary: 'Delete Notice',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/notices/categories/{id}': {
      patch: {
        tags: ['Notices'],
        summary: 'Update Notice Category',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  category_name: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Notices'],
        summary: 'Delete Notice Category',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/blogs': {
      get: {
        tags: ['Blogs'],
        summary: 'Get All Blogs',
        parameters: [
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Blogs'],
        summary: 'Create Blog',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['title', 'description', 'published_date'],
                properties: {
                  category_id: { type: 'integer' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  published_date: { type: 'string', format: 'date' },
                  image: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/blogs/categories': {
      get: {
        tags: ['Blogs'],
        summary: 'Get Blog Categories',
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Blogs'],
        summary: 'Create Blog Category',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['category_name'],
                properties: {
                  category_name: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/blogs/category/{category_id}': {
      get: {
        tags: ['Blogs'],
        summary: 'Get Blogs by Category',
        parameters: [
          { in: 'path', name: 'category_id', required: true, schema: { type: 'integer' } },
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
    },
    '/api/v1/blogs/{id}': {
      get: {
        tags: ['Blogs'],
        summary: 'Get Blog by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not found' },
        },
      },
      patch: {
        tags: ['Blogs'],
        summary: 'Update Blog',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  category_id: { type: 'integer' },
                  title: { type: 'string' },
                  description: { type: 'string' },
                  published_date: { type: 'string', format: 'date' },
                  image: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Blogs'],
        summary: 'Delete Blog',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/blogs/categories/{id}': {
      patch: {
        tags: ['Blogs'],
        summary: 'Update Blog Category',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  category_name: { type: 'string' },
                  description: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Blogs'],
        summary: 'Delete Blog Category',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
    '/api/v1/achievements': {
      get: {
        tags: ['Achievements'],
        summary: 'Get All Achievements',
        parameters: [
          { in: 'query', name: 'page', schema: { type: 'integer' } },
          { in: 'query', name: 'limit', schema: { type: 'integer' } },
        ],
        responses: { '200': { description: 'Success' } },
      },
      post: {
        tags: ['Achievements'],
        summary: 'Create Achievement',
        security: [{ bearerAuth: [] }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                required: ['title', 'achievement_date'],
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  achievement_date: { type: 'string', format: 'date' },
                  images: { type: 'array', items: { type: 'string', format: 'binary' } },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '401': { description: 'Unauthorized' },
        },
      },
    },
    '/api/v1/achievements/{id}': {
      get: {
        tags: ['Achievements'],
        summary: 'Get Achievement by ID',
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not found' },
        },
      },
      patch: {
        tags: ['Achievements'],
        summary: 'Update Achievement',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        requestBody: {
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' },
                  achievement_date: { type: 'string', format: 'date' },
                  images: { type: 'array', items: { type: 'string', format: 'binary' } },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Updated' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
      delete: {
        tags: ['Achievements'],
        summary: 'Delete Achievement',
        security: [{ bearerAuth: [] }],
        parameters: [{ in: 'path', name: 'id', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Deleted' },
          '401': { description: 'Unauthorized' },
          '404': { description: 'Not found' },
        },
      },
    },
  },
};

export default swaggerSpec;
