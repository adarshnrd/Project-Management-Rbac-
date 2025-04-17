import { ModelTemplate, ModelTemplateClass } from '#models/modelTemplate';
import { AppDataSource } from '#src/config';
import { InsertQueryBuilder } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type UpsertQueryBuilderOptions<T extends ModelTemplate> = {
  criteriaProperties?: Array<keyof T>;
};

/**
 * This method provides Type convenience around our `ModelTemplate`s;
 *   there is nothing "special" about the returned QueryBuilder.
 *
 * The Models inserted by the InsertQueryBuilder returned from ths method
 *   can be obtained (in Typed fashion) through the use of `executeInsertQueryBuilderForModels`.
 *
 * @param models {ModelTemplate[]}
 * @returns {InsertQueryBuilder} a QueryBuilder which `INSERT`s all of the Models in one query
 */
export function insertQueryBuilderForModels<T extends ModelTemplate>(models: T[]): InsertQueryBuilder<T> {
  const model = (<unknown>models[0].constructor) as ModelTemplateClass<T>;
  return AppDataSource.createQueryBuilder()
    .insert()
    .into(model)
    .values(models as QueryDeepPartialEntity<T>[]);
}

/**
 * This method applies standard UPSERT semantics to an existing InsertQueryBuilder.
 *
 * By default, it assumes that the 'id' property is the single criteria for the UPSERT;
 *   *all other properties* will get UPDATE-d if the Model already exists by 'id'.
 *   Alternate criteria properties can be specified via options.
 *
 * @param Model {ModelTemplateClass} the Model Class, for metadata extraction purposes
 * @param queryBuilder {InsertQueryBuilder}
 * @param [options] {UpsertQueryBuilderOptions}
 * @returns {InsertQueryBuilder} `queryBuilder`, cloned, with support for `INSERT ... ON CONFLICT`
 */
export function upsertForInsertQueryBuilder<T extends ModelTemplate>(
  model: ModelTemplateClass<T>,
  queryBuilder: InsertQueryBuilder<T>,
  options: UpsertQueryBuilderOptions<T>,
): InsertQueryBuilder<T> {
  const repository = AppDataSource.getRepository(model);
  // default behavior;
  //   `id` is the constraining column
  //   all other columns are subject to UPSERT
  const criteriaProperties = options?.criteriaProperties || ['id'];
  const criteriaPropertySet = new Set(criteriaProperties);

  const nonCriteriaProperties = repository.metadata.columns
    .map((column) => column.databaseName)
    .filter((property) => !criteriaPropertySet.has(property as keyof T));

  // https://www.postgresql.org/docs/10/sql-insert.html#SQL-ON-CONFLICT
  return queryBuilder.clone().orUpdate({
    conflict_target: criteriaProperties as string[],
    overwrite: nonCriteriaProperties,
  });
}
