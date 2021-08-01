import { Query } from 'mongoose';
import { ModelTypes } from '../types/models';
import PaginateInterface from './PaginateInterface';
import { userInterface } from './UserInterface';

export default interface AdvancedResultsInterface {
  success: boolean;
  count: number;
  pagination: PaginateInterface;
  data: userInterface[];
}
