export function getActiveFilters(formData: any) {
  const filters: Record<string, any> = {};

  const addFilter = (filter: any) => {
    if (filter.col && filter.val !== undefined) {
      filters[filter.col] = filter.val;
    } else if (filter.subject && filter.comparator !== undefined) {
      filters[filter.subject] = filter.comparator;
    }
  };

  // 1. Проверяем extraFormData.filters
  if (formData.extraFormData?.filters) {
    formData.extraFormData.filters.forEach(addFilter);
  }

  // 2. Проверяем dataMask (native filters)
  // if (formData.dataMask) {
  //   Object.values(formData.dataMask).forEach((mask: any) => {
  //     if (mask.extraFormData?.filters) {
  //       mask.extraFormData.filters.forEach(addFilter);
  //     }
  //     if (mask.filterState?.value !== undefined) {
  //       const { id } = mask;
  //       filters[`filter_${id}`] = mask.filterState.value;
  //     }
  //   });
  // }

  // 3. Проверяем adhoc_filters
  // if (Array.isArray(formData.adhoc_filters)) {
  //   formData.adhoc_filters.forEach((filter: any) => {
  //     if (filter.subject && filter.comparator !== undefined) {
  //       filters[filter.subject] = filter.comparator;
  //     }
  //   });
  // }

  // // 4. Проверяем extra_filters
  // if (Array.isArray(formData.extra_filters)) {
  //   formData.extra_filters.forEach(addFilter);
  // }

  // 5. Проверяем filterConfigs
  // if (Array.isArray(formData.filterConfigs)) {
  //   formData.filterConfigs.forEach((config: any) => {
  //     if (config.column && config.value !== undefined) {
  //       filters[config.column] = config.value;
  //     }
  //   });
  // }

  return filters;
}

export function buildFinalUrl(baseUrl: string, filters: Record<string, any>) {
  // Берем только домен из baseUrl
  const url = new URL(baseUrl || 'https://example.com');

  try {
    const params = new URLSearchParams();

    // Добавляем фильтры как параметры
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (Array.isArray(value) || typeof value === 'object') {
          params.append(key, JSON.stringify(value));
        } else {
          params.append(key, String(value));
        }
      }
    });

    // Формируем итоговый URL: домен + параметры
    return `${url.origin}${url.pathname === '/' ? '' : url.pathname}?${params.toString()}`;
  } catch (e) {
    console.error('Error building URL:', e);
    return baseUrl;
  }
}
