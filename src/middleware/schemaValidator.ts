// import addFormats from 'ajv-formats';
import Ajv from 'ajv';
import { NextFunction, Request, Response } from 'express';
const ajv = new Ajv({allErrors: true});
// addFormats(ajv);

const validateSchema = async (req : Request, res :Response, next: NextFunction) => {
  try {
    const { schema } = await import(`../schemas/${req.params.tablename}`)
    const schemaValidator = ajv.compile(schema);
      const isValid = schemaValidator(req.body);
      if(isValid) {
        next()
      } else {
        res.status(500).json(schemaValidator.errors)
      }
    } catch (error: any) {
      res.status(500).json({error:'Unable to Validate Data, check if the route is correct'})
    }
}

export { validateSchema };
