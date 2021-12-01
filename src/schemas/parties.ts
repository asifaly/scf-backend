import { customer_statuses } from '../config/config';

const parties = {
  'required': [
      'bank_id',
      'customer_id',
      'account_number',
      'name',
      'base_currency',
      'address',
      'default_role',
      'customer',
      'status'
  ],
  'properties': {
      'bank_id': {
          '$id': '#/properties/bank_id',
          'type': 'string'
      },
      'customer_id': {
          '$id': '#/properties/customer_id',
          'type': 'string'
      },
      'account_number': {
          '$id': '#/properties/account_number',
          'type': 'string'
      },
      'name': {
          '$id': '#/properties/name',
          'type': 'string'
      },
      'address': { '$ref': '/schemas/address' },
      'base_currency': {
          '$id': '#/properties/base_currency',
          'type': 'string'
      },
      'default_role': {
          '$id': '#/properties/default_role',
          'type': 'string'
      },
      'customer': {
          '$id': '#/properties/customer',
          'type': 'string',
          'default': false
      },
      'status': {
          '$id': '#/properties/status',
          'type': 'string',
          'default': 'ONBOARDING',
          'enum': customer_statuses
      }
  },
  '$id': '/schemas/parties',
  'type': 'object',
  'title': 'Party',
  'definitions': {},
  '$schema': 'http://json-schema.org/draft-07/schema#'
}