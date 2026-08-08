import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ToolLayout } from '../components/layout/ToolLayout';
import { TOOLS } from '../data/toolsData';

// Import tool components
import { JsonFormatter } from '../components/tools/JsonFormatter/JsonFormatter';
import { JwtDecoder } from '../components/tools/JwtDecoder/JwtDecoder';
import { SqlFormatter } from '../components/tools/SqlFormatter/SqlFormatter';
import { RegexTester } from '../components/tools/RegexTester/RegexTester';
import { Base64Encoder } from '../components/tools/Base64Encoder/Base64Encoder';
import { FlexGridPlayground } from '../components/tools/FlexGridPlayground/FlexGridPlayground';

export const ToolPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const tool = TOOLS.find((t) => t.slug === slug);

  if (!tool) {
    return <Navigate to="/" replace />;
  }

  const renderToolComponent = () => {
    switch (tool.id) {
      case 'json-formatter':
        return <JsonFormatter />;
      case 'jwt-decoder':
        return <JwtDecoder />;
      case 'sql-formatter':
        return <SqlFormatter />;
      case 'regex-tester':
        return <RegexTester />;
      case 'base64-url-encoder':
        return <Base64Encoder />;
      case 'flexbox-grid-playground':
        return <FlexGridPlayground />;
      default:
        return <div>Tool workspace</div>;
    }
  };

  return <ToolLayout tool={tool}>{renderToolComponent()}</ToolLayout>;
};
