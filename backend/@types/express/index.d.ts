import * as express from 'express';
import { UserDocument } from '../../backend/models/userModel';
import AdvancedResultsInterface from '../../backend/app/interfaces/AdvancedResultsInterface';
import { userInterface } from '../../backend/app/interfaces/UserInterface';

declare global {
  namespace Express {
    interface Response {
      advancedResults: AdvancedResultsInterface;
    }
    interface Request {
      user: userInterface;
    }
  }
}
