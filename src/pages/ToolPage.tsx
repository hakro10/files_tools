import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ToolLayout } from '../components/layout/ToolLayout';
import { TOOLS } from '../data/toolsData';

// Import Developer Tools
import { JsonFormatter } from '../components/tools/JsonFormatter/JsonFormatter';
import { JwtDecoder } from '../components/tools/JwtDecoder/JwtDecoder';
import { SqlFormatter } from '../components/tools/SqlFormatter/SqlFormatter';
import { RegexTester } from '../components/tools/RegexTester/RegexTester';
import { Base64Encoder } from '../components/tools/Base64Encoder/Base64Encoder';
import { FlexGridPlayground } from '../components/tools/FlexGridPlayground/FlexGridPlayground';

// Import File Conversion Tools
import { JpgToPdf } from '../components/tools/JpgToPdf/JpgToPdf';
import { PngToPdf } from '../components/tools/PngToPdf/PngToPdf';
import { PdfToJpg } from '../components/tools/PdfToJpg/PdfToJpg';
import { ImageCompressor } from '../components/tools/ImageCompressor/ImageCompressor';

export const ToolPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const tool = TOOLS.find((t) => t.slug === slug);

  // Dynamic SEO Page Title & Meta Description update
  useEffect(() => {
    if (tool) {
      document.title = `${tool.name} - FilesTools.net (100% Client-Side)`;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', tool.shortDescription);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = tool.shortDescription;
        document.head.appendChild(meta);
      }
    }
  }, [tool]);

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
      case 'jpg-to-pdf':
        return <JpgToPdf />;
      case 'png-to-pdf':
        return <PngToPdf />;
      case 'pdf-to-jpg':
        return <PdfToJpg />;
      case 'image-compressor':
        return <ImageCompressor />;
      default:
        return <div>Tool workspace</div>;
    }
  };

  return <ToolLayout tool={tool}>{renderToolComponent()}</ToolLayout>;
};
