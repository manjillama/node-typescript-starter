/* eslint-disable no-unused-vars, @typescript-eslint/explicit-module-boundary-types */
import { Aggregate, Model } from 'mongoose';

export default class AggregateFeatures<T extends Document> {
  query: Aggregate<any[]>;
  constructor(private model: Model<T>, public queryString: any, public initialAggregateParams: any) {
    this.query = this.model.aggregate(initialAggregateParams);
  }

  // 1A) FILTERING
  filter(): AggregateFeatures<T> {
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1B) ADVANCE FILTERING
    let queryStr: any = JSON.stringify(queryObj);
    queryStr = JSON.parse(queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match: string) => `$${match}`));

    this.query.match(queryStr);
    return this;
  }

  // 2) SORTING
  sort(): AggregateFeatures<T> {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join('');
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  paginate(size: number): AggregateFeatures<T> {
    const page = +this.queryString.page || 1;
    const skip = (page - 1) * size;

    // skip: skip results (offset) and limit: number of results per page
    this.query = this.query.skip(skip).limit(size);

    return this;
  }
}
