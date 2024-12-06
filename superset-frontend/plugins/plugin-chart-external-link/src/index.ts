import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './plugin/buildQuery';
import controlPanel from './plugin/controlPanel';
import transformProps from './plugin/transformProps';
import ExternalLinkChart from './ExternalLinkChart';

export default class ExternalLinkChartPlugin extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      name: t('External Link'),
      description: '',
      thumbnail: 'thumbnail',
    });

    super({
      buildQuery,
      controlPanel,
      loadChart: () => Promise.resolve(ExternalLinkChart),
      metadata,
      transformProps,
    });
  }
}
