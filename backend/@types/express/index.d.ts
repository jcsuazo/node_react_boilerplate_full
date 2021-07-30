import * as express from 'express';
import { UserDocument } from '../../backend/models/userModel';
import AdvancedResultsInterface from '../../backend/app/interfaces/AdvancedResultsInterface.ts';

declare global {
  namespace Express {
    interface Response {
      advancedResults: AdvancedResultsInterface;
    }
  }
}
