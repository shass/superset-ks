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
            },
          },
        ],
        // [
        //   {
        //     name: 'filter_types',
        //     config: {
        //       type: 'SelectControl',
        //       label: t('Filter Types to Track'),
        //       description: t(
        //         'Select which types of filters should be tracked and included in the URL',
        //       ),
        //       default: ['dataMask'],
        //       multi: true,
        //       options: [
        //         {
        //           value: 'extraFormData',
        //           label: t('Extra Form Filters'),
        //         },
        //         {
        //           value: 'dataMask',
        //           label: t('Data Mask Filters'),
        //           description: t(
        //             'Current values of native dashboard filters, time range filters, and cross-filter interactions',
        //           ),
        //         },
        //         {
        //           value: 'adhoc_filters',
        //           label: t('Adhoc Filters'),
        //           description: t(
        //             'Custom filters created within individual chart configurations, including SQL conditions',
        //           ),
        //         },
        //         {
        //           value: 'extra_filters',
        //           label: t('Extra Filters'),
        //           description: t(
        //             'Additional filters that can be added programmatically or via URL parameters',
        //           ),
        //         },
        //         {
        //           value: 'filterConfigs',
        //           label: t('Filter Configurations'),
        //           description: t(
        //             'Metadata and settings that define filter structure, display options, and chart connections',
        //           ),
        //         },
        //       ],
        //     },
        //   },
        // ],
      ],
    },
  ],
};

export default config;
