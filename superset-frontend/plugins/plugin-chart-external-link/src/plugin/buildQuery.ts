import { buildQueryContext, QueryFormData } from '@superset-ui/core';

export default function buildQuery(formData: QueryFormData) {
  // Всегда запрашиваем всю таблицу
  const queryContext = buildQueryContext(formData, {
    queryFields: {
      groupby: 'groupby',
      metrics: 'groupby',
    },
  });

  // Добавляем базовое условие
  queryContext.queries[0].metrics = [
    {
      label: 'count',
      expressionType: 'SQL',
      sqlExpression: 'COUNT(*)',
    },
  ];

  console.log('Query context:', queryContext);

  return queryContext;
}
