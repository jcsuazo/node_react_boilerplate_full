import { Query } from 'mongoose';
import { ModelTypes } from '../types/models';
import PaginateInterface from './PaginateInterface';

export default interface AdvancedResultsInterface {
  success: boolean;
  count: number;
  pagination: PaginateInterface;
  data: Query<ModelTypes[], ModelTypes, {}, ModelTypes>;
}
