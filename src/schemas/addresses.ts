import { country_codes } from '../config/config'

const schema = {
  'required': [
      'address_line_1',
      'city',
      'zipcode',
      'country_code'
  ],
  'properties': {
      'address_line_1': {
          '$id': '#/properties/address_line_1',
          'type': 'string',
          'maxLength': 35
      },
      'address_line_2': {
          '$id': '#/properties/address_line_2',
          'type': 'string',
          'maxLength': 35
      },
      'city': {
          '$id': '#/properties/city',
          'type': 'string',
          'maxLength': 35
      },
      'state': {
          '$id': '#/properties/state',
          'type': 'string'
      },
      'zipcode': {
          '$id': '#/properties/zipcode',
          'type': 'string',
          'maxLength': 6
      },
      'country_code': {
          '$id': '#/properties/country_code',
          'type': 'string',
          'enum': country_codes
      }
  },
  '$id': '/schemas/address',
  'type': 'object',
  'title': 'Address',
  'definitions': {},
  '$schema': 'http://json-schema.org/draft-07/schema#'
}

export { schema }
