import { param, body, type ValidationChain } from 'express-validator'

export const showValidationRules = (): ValidationChain[] => {
  return [param('id').isInt().toInt()]
}

export const storeValidationRules = (): ValidationChain[] => {
  return [
    body('title').isString(),
    body('studios').isString(),
    body('producers').isString(),
    body('year').isInt().toInt(),
    body('winner').isBoolean().toBoolean(),
  ]
}

export const updateValidationRules = (): ValidationChain[] => {
  return [
    param('id').isInt().toInt(),
    body('title').isString(),
    body('studios').isString(),
    body('producers').isString(),
    body('year').isInt().toInt(),
    body('winner').isBoolean().toBoolean(),
  ]
}

export const destroyValidationRules = (): ValidationChain[] => {
  return [param('id').isInt().toInt()]
}
