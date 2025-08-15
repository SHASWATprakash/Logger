const Joi = require('joi');

const logSchema = Joi.object({
  level: Joi.string().valid('error', 'warn', 'info', 'debug').required(),
  message: Joi.string().min(1).required(),
  resourceId: Joi.string().required(),
  timestamp: Joi.date().iso().required(),
  traceId: Joi.string().required(),
  spanId: Joi.string().required(),
  commit: Joi.string().required(),
  metadata: Joi.object().unknown(true).default({})
});

module.exports = { logSchema };
