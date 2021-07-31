import { Model, Document } from 'mongoose';
import _ from 'lodash';
import APIFeatures from '../utils/apiFeatures';
import { StringMap } from '../types';

type GetAll<T> = {
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  populate: (options: string | StringMap) => GetAll<T>;
  exec: () => Promise<[T[], number, number]>;
};

/**
 * @param  {Model<T>} model
 * @param  {StringMap} query
 */
function getAll<T extends Document>(
  model: Model<T>,
  query: StringMap
  // eslint-disable-next-line no-unused-vars
): GetAll<T> {
  const { limit } = query;

  const size = limit && !Number.isNaN(Number(limit)) ? Number(limit) : 40;

  const features = new APIFeatures(model.find(), query).filter().sort().limitFields().paginate(size);

  const totalCountFilter = _.omit(query, ['page', 'sort', 'limit', 'fields']);

  return {
    populate(options: string | StringMap) {
      features.query.populate(options);
      return this;
    },
    async exec() {
      const [data, totalCount] = await Promise.all([features.query, model.countDocuments(totalCountFilter as any)]);
      return [data, totalCount, size];
    }
  };
}

export default {
  getAll
};
