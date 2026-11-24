const { randomBytes, randomUUID } = require('node:crypto');
const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const { z } = require('zod');
const { getProductById, getProducts } = require('./database');

class ApiError extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

const couponSchema = z.object({
  code: z.string().trim().toUpperCase().min(1).max(20),
}).strict();

const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.number().int().positive(),
    quantity: z.number().int().min(1).max(10),
  }).strict()).min(1).max(20),
  couponCode: z.string().trim().toUpperCase().max(20).optional().default(''),
}).strict().superRefine(({ items }, context) => {
  const productIds = items.map((item) => item.productId);
  if (new Set(productIds).size !== productIds.length) {
    context.addIssue({
      code: 'custom',
      message: 'Cada produto deve aparecer uma única vez.',
      path: ['items'],
    });
  }
});

const contactSchema = z.object({
  name: z.string().trim().min(3).max(100),
  email: z.string().trim().email().max(254).transform((email) => email.toLowerCase()),
  phone: z.string().trim().max(30).optional().transform((phone) => phone || null),
  subject: z.enum([
    'Orçamento de PC Gamer',
    'Dúvida sobre Notebooks ou Smartphones',
    'Disponibilidade de Jogos e Consoles',
    'Suporte e Garantia',
  ]),
  message: z.string().trim().min(10).max(2000),
}).strict();

function parseBody(schema, body, message) {
  const result = schema.safeParse(body);
  if (!result.success) {
    throw new ApiError(400, 'VALIDATION_ERROR', message);
  }
  return result.data;
}

function createRateLimiter(limit) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (_request, response) => {
      response.status(429).json({
        error: {
          code: 'RATE_LIMITED',
          message: 'Muitas tentativas. Aguarde alguns minutos e tente novamente.',
        },
      });
    },
  });
}

function createApp(database, options = {}) {
  const app = express();
  const allowedOrigins = new Set(
    (options.allowedOrigins ?? process.env.CORS_ORIGINS ?? 'http://localhost:4200,http://127.0.0.1:4200')
      .split(',')
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
  const writeLimiter = createRateLimiter(10);
  const couponLimiter = createRateLimiter(20);

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      callback(null, !origin || allowedOrigins.has(origin));
    },
    credentials: false,
  }));
  app.use(express.json({ limit: '16kb', strict: true }));

  app.get('/api/health', (_request, response) => {
    response.json({ status: 'ok' });
  });

  app.get('/api/products', (_request, response) => {
    response.json(getProducts(database));
  });

  app.post('/api/coupons/validate', couponLimiter, (request, response) => {
    const { code } = parseBody(couponSchema, request.body, 'Informe um cupom válido.');
    if (code !== 'GAME10') {
      throw new ApiError(400, 'INVALID_COUPON', 'Cupom inválido. Utilize o código GAME10.');
    }

    response.json({ code, discountPercent: 10 });
  });

  app.post('/api/orders', writeLimiter, (request, response) => {
    const { items, couponCode } = parseBody(
      orderSchema,
      request.body,
      'Revise os produtos e as quantidades do pedido.',
    );
    if (couponCode && couponCode !== 'GAME10') {
      throw new ApiError(400, 'INVALID_COUPON', 'Cupom inválido. Utilize o código GAME10.');
    }

    const orderItems = items.map(({ productId, quantity }) => {
      const product = getProductById(database, productId);
      if (!product) {
        throw new ApiError(400, 'PRODUCT_UNAVAILABLE', 'Um dos produtos do pedido não está disponível.');
      }
      return { ...product, quantity };
    });

    const subtotalCents = orderItems.reduce(
      (subtotal, item) => subtotal + item.priceCents * item.quantity,
      0,
    );
    const discountCents = couponCode ? Math.round(subtotalCents * 0.1) : 0;
    const totalCents = subtotalCents - discountCents;
    const id = randomUUID();
    const orderNumber = `GHQ-${Date.now().toString(36).toUpperCase()}-${randomBytes(3).toString('hex').toUpperCase()}`;
    const createdAt = new Date().toISOString();

    database.exec('BEGIN IMMEDIATE');
    try {
      database.prepare(`
        INSERT INTO orders (
          id, order_number, status, coupon_code, subtotal_cents,
          discount_cents, total_cents, created_at
        ) VALUES (?, ?, 'pending', ?, ?, ?, ?, ?)
      `).run(
        id,
        orderNumber,
        couponCode || null,
        subtotalCents,
        discountCents,
        totalCents,
        createdAt,
      );

      const insertItem = database.prepare(`
        INSERT INTO order_items (
          order_id, product_id, product_name, unit_price_cents, quantity
        ) VALUES (?, ?, ?, ?, ?)
      `);
      for (const item of orderItems) {
        insertItem.run(id, item.id, item.name, item.priceCents, item.quantity);
      }
      database.exec('COMMIT');
    } catch (error) {
      database.exec('ROLLBACK');
      throw error;
    }

    response.status(201).json({
      id,
      orderNumber,
      status: 'pending',
      subtotal: subtotalCents / 100,
      discount: discountCents / 100,
      total: totalCents / 100,
    });
  });

  app.post('/api/contact', writeLimiter, (request, response) => {
    const contact = parseBody(
      contactSchema,
      request.body,
      'Revise os campos do formulário antes de enviar.',
    );
    const id = randomUUID();
    const createdAt = new Date().toISOString();

    database.prepare(`
      INSERT INTO contacts (id, name, email, phone, subject, message, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      id,
      contact.name,
      contact.email,
      contact.phone,
      contact.subject,
      contact.message,
      createdAt,
    );

    response.status(201).json({
      id,
      message: 'Mensagem recebida com sucesso. Nossa equipe responderá em breve.',
    });
  });

  app.use((_request, _response, next) => {
    next(new ApiError(404, 'NOT_FOUND', 'O recurso solicitado não foi encontrado.'));
  });

  app.use((error, _request, response, next) => {
    if (response.headersSent) {
      next(error);
      return;
    }

    if (error instanceof ApiError) {
      response.status(error.status).json({
        error: { code: error.code, message: error.message },
      });
      return;
    }

    if (error?.type === 'entity.too.large') {
      response.status(413).json({
        error: { code: 'PAYLOAD_TOO_LARGE', message: 'A solicitação excede o tamanho permitido.' },
      });
      return;
    }

    if (error instanceof SyntaxError && 'body' in error) {
      response.status(400).json({
        error: { code: 'INVALID_JSON', message: 'O corpo da solicitação não contém JSON válido.' },
      });
      return;
    }

    console.error('[api] Erro interno ao processar solicitação:', error);
    response.status(500).json({
      error: { code: 'INTERNAL_ERROR', message: 'Não foi possível concluir a solicitação.' },
    });
  });

  return app;
}

module.exports = { createApp };
