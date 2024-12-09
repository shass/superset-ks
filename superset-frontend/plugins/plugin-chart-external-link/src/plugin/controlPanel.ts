import { t } from '@superset-ui/core';
import { ControlPanelConfig } from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('URL Configuration'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'base_url',
            config: {
              type: 'TextControl',
              label: t('Base URL'),
              description: t('Base URL for external link'),
              default: 'https://teamvalue.ks.works',
              validators: [(v: string) => !v && 'Base URL is required'],
            },
          },
        ],
      ],
    },
  ],
};

export default config;
