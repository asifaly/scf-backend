// import { JSONSchemaType } from 'ajv'

// interface Bank {
//   id: string,
//   name: string,
//   city: string,
//   country_code: string,
//   base_currency: string,
// }

// const schema: JSONSchemaType<Bank> = {
//   type: 'object',
//   properties: {
//     id: {type: 'string'},
//     name: {type: 'string'},
//     city: {type: 'string'},
//     country_code: {type: 'enum'},
//     base_currency: {type: 'string'},
//   },
//   required: ['name', 'city', 'country_code', 'base_currency'],
//   additionalProperties: false
// }