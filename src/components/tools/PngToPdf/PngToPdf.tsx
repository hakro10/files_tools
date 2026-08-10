import React, { useState } from 'react';
import { PDFDocument, PageSizes } from 'pdf-lib';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import { ErrorAlert } from '../../common/ErrorAlert';
import {
  FileImage,
  Upload,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  Settings
} from 'lucide-react';

interface UploadedPng {
  id: string;
  name: string;
  size: number;
  dataUrl: string;
  width: number;
  height: number;
}

export const PngToPdf: React.FC = () => {
  const [images, setImages] = useState<UploadedPng[]>([]);
  const [margin, setMargin] = useState<number>(10);
  const [pageSize, setPageSize] = useState<'A4' | 'LETTER' | 'FIT'>('A4');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setError(null);

    const newImages: UploadedPng[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.match(/image\/png/i)) {
        setError('Please upload valid PNG image files.');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result as string;
        const img = new Image();
        img.onload = () => {
          newImages.push({
            id: Math.random().toString(36).substring(2, 9),
            name: file.name,
            size: file.size,
            dataUrl,
            width: img.width,
            height: img.height
          });
          processed++;
          if (processed === files.length) {
            setImages((prev) => [...prev, ...newImages]);
          }
        };
        img.src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  };

  const moveImage = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;
    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setImages(updated);
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const generatePdf = async () => {
    if (images.length === 0) return;
    setIsGenerating(true);
    setError(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const imgItem of images) {
        const pngImageBytes = await fetch(imgItem.dataUrl).then((res) => res.arrayBuffer());
        const embeddedImage = await pdfDoc.embedPng(pngImageBytes);

        let pageWidth = PageSizes.A4[0];
        let pageHeight = PageSizes.A4[1];

        if (pageSize === 'LETTER') {
          pageWidth = PageSizes.Letter[0];
          pageHeight = PageSizes.Letter[1];
        } else if (pageSize === 'FIT') {
          pageWidth = imgItem.width + margin * 2;
          pageHeight = imgItem.height + margin * 2;
        }

        if (orientation === 'landscape' && pageSize !== 'FIT') {
          const temp = pageWidth;
          pageWidth = pageHeight;
          pageHeight = temp;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);
        const printableWidth = pageWidth - margin * 2;
        const printableHeight = pageHeight - margin * 2;

        const imageRatio = embeddedImage.width / embeddedImage.height;
        const pageRatio = printableWidth / printableHeight;

        let drawWidth = printableWidth;
        let drawHeight = printableHeight;

        if (imageRatio > pageRatio) {
          drawHeight = printableWidth / imageRatio;
        } else {
          drawWidth = printableHeight * imageRatio;
        }

        const x = margin + (printableWidth - drawWidth) / 2;
        const y = margin + (printableHeight - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'converted_png_images.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      console.error('PDF generation error:', err);
      setError(`Failed to generate PDF document: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dropzone & Upload Area */}
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border-2 border-dashed border-slate-300 dark:border-slate-800 text-center space-y-4 shadow-sm transition-colors">
        <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 w-12 h-12 mx-auto flex items-center justify-center">
          <FileImage className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Upload PNG Images to Convert to PDF
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Convert PNG graphics while maintaining high resolution and alpha transparency. 100% Client-Side.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-md">
          <Upload className="w-4 h-4" />
          <span>Select PNG Files</span>
          <input
            type="file"
            multiple
            accept="image/png"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <ErrorAlert message={error} />

      {/* Settings & Controls */}
      {images.length > 0 && (
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 transition-colors">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <Settings className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span>Page Size:</span>
              <select
                value={pageSize}
                onChange={(e: any) => setPageSize(e.target.value)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 outline-none"
              >
                <option value="A4">A4 Standard</option>
                <option value="LETTER">US Letter</option>
                <option value="FIT">Fit to Image Size</option>
              </select>
            </div>

            {pageSize !== 'FIT' && (
              <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span>Orientation:</span>
                <select
                  value={orientation}
                  onChange={(e: any) => setOrientation(e.target.value)}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-slate-200 outline-none"
                >
                  <option value="portrait">Portrait</option>
                  <option value="landscape">Landscape</option>
                </select>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <span>Margin: {margin}px</span>
              <input
                type="range"
                min={0}
                max={40}
                step={5}
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                className="w-24 accent-cyan-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setImages([])}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-slate-300 dark:border-slate-700 transition"
            >
              Clear All
            </button>
            <button
              onClick={generatePdf}
              disabled={isGenerating}
              className="px-5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{isGenerating ? 'Compiling PDF...' : 'Convert & Download PDF'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Uploaded Images List */}
      {images.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
            <span>Page Order ({images.length} PNG Images)</span>
            <span className="text-slate-500 font-normal">Use arrows to reorder pages</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center gap-3 shadow-sm transition-colors"
              >
                <span className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <img
                  src={img.dataUrl}
                  alt={img.name}
                  className="w-12 h-12 rounded object-cover border border-slate-300 dark:border-slate-800 shrink-0 bg-checkerboard"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-900 dark:text-slate-200 truncate">
                    {img.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    {img.width}x{img.height} • {(img.size / 1024).toFixed(1)} KB
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveImage(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveImage(idx, 'down')}
                    disabled={idx === images.length - 1}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="p-1 rounded hover:bg-red-500/10 text-slate-500 hover:text-red-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Output Ad Slot */}
      <AdSlotOutput />
    </div>
  );
};
