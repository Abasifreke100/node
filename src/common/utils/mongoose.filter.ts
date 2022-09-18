1;

import {
  ArgumentsHost,
  Catch,
  ConflictException,
  ExceptionFilter,
} from '@nestjs/common';
import { MongoServerError } from 'mongodb';
import * as mongoose from 'mongoose';

@Catch(mongoose.mongo.MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000:
        throw new ConflictException(
          `Duplicate unique key '${Object.keys(exception.keyValue)}'`,
        );
    }
  }
}
