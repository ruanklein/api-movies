import { param, body, type ValidationChain } from 'express-validator'

export const showValidationRules = (): ValidationChain[] => {
  return [param('id').isInt().withMessage('ID must be an integer')]
}

export const storeValidationRules = (): ValidationChain[] => {
  return [
    body('title')
      .isString()
      .isLength({ min: 1, max: 40 })
      .withMessage('Title must be between 1 and 40 characters'),
    body('studios')
      .isString()
      .isLength({ min: 1, max: 80 })
      .withMessage('Studios must be between 1 and 80 characters'),
    body('producers')
      .isString()
      .isLength({ min: 1, max: 80 })
      .withMessage('Producers must be between 1 and 80 characters'),
    body('year').isInt().toInt().withMessage('Year must be an integer'),
    body('winner').isBoolean().withMessage('Winner must be a boolean'),
  ]
}

export const updateValidationRules = (): ValidationChain[] => {
  return [
    param('id').isInt().withMessage('ID must be an integer'),
    body('title')
      .isString()
      .isLength({ min: 1, max: 40 })
      .withMessage('Title must be between 1 and 40 characters'),
    body('studios')
      .isString()
      .isLength({ min: 1, max: 80 })
      .withMessage('Studios must be between 1 and 80 characters'),
    body('producers')
      .isString()
      .isLength({ min: 1, max: 80 })
      .withMessage('Producers must be between 1 and 80 characters'),
    body('year').isInt().toInt().withMessage('Year must be an integer'),
    body('winner').isBoolean().withMessage('Winner must be a boolean'),
  ]
}

export const destroyValidationRules = (): ValidationChain[] => {
  return [param('id').isInt().withMessage('ID must be an integer')]
}
