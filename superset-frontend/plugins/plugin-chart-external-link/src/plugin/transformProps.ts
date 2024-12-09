import { ChartProps } from '@superset-ui/core';

export default function transformProps(chartProps: ChartProps) {
  const { width, height, formData, queriesData } = chartProps;

  return {
    width,
    height,
    data: queriesData[0]?.data || [],
    formData, // передаем все formData для доступа к фильтрам
  };
}
