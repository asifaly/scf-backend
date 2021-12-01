
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
          'type': 'string',
          'maxLength': 10
      },
      'address': { '$ref': '/schemas/address' }
  },
  '$id': '/schemas/banks',
  'type': 'object',
  'title': 'Bank',
  'definitions': {},
  '$schema': 'http://json-schema.org/draft-07/schema#'
}

export { schema }
