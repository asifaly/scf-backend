import { country_codes } from '../enums/countries'
import { currency_codes } from '../enums/currencies'

const schema = {
  'required': [
      'name',
      'city',
      'country_code',
      'base_currency'
  ],
  'properties': {
      'id': {
          '$id': '#/properties/id',
          'type': 'string'
      },
      'name': {
          '$id': '#/properties/name',
          'type': 'string'
      },
      'city': {
          '$id': '#/properties/city',
          'type': 'string'
      },
      'country_code': {
          '$id': '#/properties/country_code',
          'type': 'string',
          'enum': country_codes
      },
      'base_currency': {
          '$id': '#/properties/base_currency',
          'type': 'string',
          'enum': currency_codes
      }
  },
  '$id': 'http://example.org/root.json#',
  'type': 'object',
  'definitions': {},
  '$schema': 'http://json-schema.org/draft-07/schema#'
}

export { schema }
