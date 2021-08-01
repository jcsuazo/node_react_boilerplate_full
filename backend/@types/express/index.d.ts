import * as express from 'express';
// import { UserDocument } from '../../backend/models/userModel';
import AdvancedResultsInterface from '../../app/interfaces/AdvancedResultsInterface';
import { userInterface } from '../../app/interfaces/UserInterface';

declare global {
  namespace Express {
    interface Response {
      advancedResults: AdvancedResultsInterface;
    }
    interface Request {
      user: userInterface | null;
    }
  }
}
