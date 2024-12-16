import React, { useEffect, useState } from 'react';
import { styled, JsonObject } from '@superset-ui/core';
import { buildFinalUrl, getActiveFilters } from './utils/filterUtils';

interface ExternalLinkProps {
  width: number;
  height: number;
  baseUrl: string;
  urlParams: string;
  data: any[];
  formData: any;
  nativeFilters?: JsonObject;
}

const StyledContainer = styled.div<{ height: number; width: number }>`
  padding: 20px;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

function ExternalLinkChart(props: ExternalLinkProps) {
  const { width, height, formData } = props;

  const [activeFilters, setActiveFilters] = useState(
    getActiveFilters(formData),
  );
  const [finalUrl, setFinalUrl] = useState<string>(
    buildFinalUrl(formData.baseUrl, activeFilters),
  );

  useEffect(() => {
    setActiveFilters(getActiveFilters(formData));
  }, [formData]);

  useEffect(() => {
    setFinalUrl(buildFinalUrl(formData.baseUrl, activeFilters));
  }, [activeFilters]);

  return (
    <StyledContainer height={height} width={width}>
      {/* <div> */}
      {/*  <h4>Фильтры:</h4> */}
      {/*  <pre */}
      {/*    style={{ */}
      {/*      maxHeight: '200px', */}
      {/*      overflow: 'auto', */}
      {/*      background: '#f5f5f5', */}
      {/*      padding: '10px', */}
      {/*    }} */}
      {/*  > */}
      {/*    {JSON.stringify(activeFilters, null, 2)} */}
      {/*  </pre> */}
      {/* </div> */}
      {/* <div> */}
      {/*  <h4>Источники в FormData:</h4> */}
      {/*  <ul> */}
      {/*    {[ */}
      {/*      'extraFormData', */}
      {/*      'dataMask', */}
      {/*      'adhoc_filters', */}
      {/*      'extra_filters', */}
      {/*      'filterConfigs', */}
      {/*    ].map(key => ( */}
      {/*      <li key={key}> */}
      {/*        {key}: {formData[key] ? '✅' : '❌'} */}
      {/*      </li> */}
      {/*    ))} */}
      {/*  </ul> */}
      {/* </div> */}
      <a
        href={finalUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'block',
          marginTop: '20px',
          padding: '10px',
          background: '#0000A0',
          color: '#ffffff',
          textAlign: 'center',
          borderRadius: '4px',
          textDecoration: 'none',
        }}
      >
        Перейти на KS
      </a>
      <div style={{ marginTop: '10px', wordBreak: 'break-all' }}>
        <small>
          <b>Итоговый URL:</b> {decodeURIComponent(finalUrl)}
        </small>
      </div>
    </StyledContainer>
  );
}

export default ExternalLinkChart;
