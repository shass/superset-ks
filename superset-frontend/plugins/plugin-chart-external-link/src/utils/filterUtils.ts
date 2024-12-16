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
  if (formData.dataMask) {
    Object.values(formData.dataMask).forEach((mask: any) => {
      if (mask.extraFormData?.filters) {
        mask.extraFormData.filters.forEach(addFilter);
      }
      // if (mask.filterState?.value !== undefined) {
      //   const { id } = mask;
      //   filters[`filter_${id}`] = mask.filterState.value;
      // }
    });
  }

  // // 3. Проверяем adhoc_filters
  if (Array.isArray(formData.adhoc_filters)) {
    formData.adhoc_filters.forEach((filter: any) => {
      if (filter.subject && filter.comparator !== undefined) {
        filters[filter.subject] = filter.comparator;
      }
    });
  }

  // 4. Проверяем extra_filters
  if (Array.isArray(formData.extra_filters)) {
    formData.extra_filters.forEach(addFilter);
  }

  // 5. Проверяем filterConfigs
  if (Array.isArray(formData.filterConfigs)) {
    formData.filterConfigs.forEach((config: any) => {
      if (config.column && config.value !== undefined) {
        filters[config.column] = config.value;
      }
    });
  }

  return filters;
}

export function buildFinalUrl(baseUrl: string, filters: Record<string, any>) {
  // Создаем URL объект из baseUrl или используем дефолтный
  const url = new URL(baseUrl || 'https://teamvalue.ks.works');

  try {
    // Получаем все существующие параметры из исходного URL
    const originalParams = new URLSearchParams(url.search);
    const params = new URLSearchParams();

    // Копируем все оригинальные параметры
    originalParams.forEach((value, key) => {
      params.append(key, value);
    });

    // Добавляем фильтры как параметры
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        const paramKey = encodeURIComponent(`getObject ${key}`);

        if (Array.isArray(value) || typeof value === 'object') {
          params.append(paramKey, JSON.stringify(value));
        } else {
          params.append(paramKey, String(value));
        }
      }
    });

    // Формируем итоговый URL
    const path = url.pathname === '/' ? '' : url.pathname;
    const hash = url.hash
      ? url.hash.startsWith('/#')
        ? url.hash
        : `/#${url.hash.slice(1)}`
      : '';
    const search = params.toString() ? `?${params.toString()}` : '';

    return `${url.origin}${path}${hash}${search}`;
  } catch (e) {
    console.error('Error building URL:', e);
    return baseUrl;
  }
}
