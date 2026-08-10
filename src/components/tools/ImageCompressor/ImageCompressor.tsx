import React, { useState, useEffect, useMemo } from 'react';
import { AdSlotOutput } from '../../ads/AdSlotOutput';
import { ErrorAlert } from '../../common/ErrorAlert';
import {
  FileImage,
  Upload,
  Download,
  Trash2,
  Sliders
} from 'lucide-react';

interface ImageFile {
  name: string;
  type: string;
  originalSize: number;
  originalDataUrl: string;
  width: number;
  height: number;
}

export const ImageCompressor: React.FC = () => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [compressedDataUrl, setCompressedDataUrl] = useState<string | null>(null);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.match(/image\/(jpeg|jpg|png|webp)/i)) {
      setError('Please upload a valid JPG, PNG, or WebP image file.');
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const img = new Image();
      img.onload = () => {
        setImageFile({
          name: file.name,
          type: file.type,
          originalSize: file.size,
          originalDataUrl: dataUrl,
          width: img.width,
          height: img.height
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Re-compress when image or quality slider changes
  useEffect(() => {
    if (!imageFile) {
      setCompressedDataUrl(null);
      setCompressedSize(0);
      return;
    }

    setIsCompressing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const format = imageFile.type.includes('png') ? 'image/jpeg' : imageFile.type;
        const qualityDecimal = quality / 100;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              setCompressedSize(blob.size);
              const url = URL.createObjectURL(blob);
              setCompressedDataUrl(url);
            }
            setIsCompressing(false);
          },
          format,
          qualityDecimal
        );
      }
    };
    img.src = imageFile.originalDataUrl;
  }, [imageFile, quality]);

  const handleDownload = () => {
    if (!compressedDataUrl || !imageFile) return;
    const link = document.createElement('a');
    link.href = compressedDataUrl;
    const extension = imageFile.name.split('.').pop() || 'jpg';
    link.download = `compressed_${imageFile.name.replace(/\.[^/.]+$/, '')}.${extension}`;
    link.click();
  };

  const savedPercentage = useMemo(() => {
    if (!imageFile || compressedSize === 0) return 0;
    const diff = imageFile.originalSize - compressedSize;
    if (diff <= 0) return 0;
    return Math.round((diff / imageFile.originalSize) * 100);
  }, [imageFile, compressedSize]);

  return (
    <div className="space-y-6">
      {/* Dropzone & Upload Area */}
      <div className="p-8 rounded-2xl bg-white dark:bg-slate-950 border-2 border-dashed border-slate-300 dark:border-slate-800 text-center space-y-4 shadow-sm transition-colors">
        <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 w-12 h-12 mx-auto flex items-center justify-center">
          <FileImage className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Upload Image to Compress
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compress JPG, PNG, and WebP images with real-time quality control. 100% Client-Side.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition cursor-pointer shadow-md">
          <Upload className="w-4 h-4" />
          <span>Select Image File</span>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      <ErrorAlert message={error} />

      {/* Interactive Quality Slider & Reduction Metrics */}
      {imageFile && (
        <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm transition-colors">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <span className="text-xs font-bold text-slate-900 dark:text-slate-200 uppercase font-mono">
                Compression Quality Target: {quality}%
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                {savedPercentage > 0 ? `${savedPercentage}% File Size Reduction` : 'Original Quality'}
              </span>

              <button
                onClick={() => setImageFile(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-red-500 hover:bg-slate-200 dark:hover:bg-slate-800 transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-mono text-slate-500">
              <span>Maximum Compression (Smaller Size)</span>
              <span>Maximum Quality (Larger Size)</span>
            </div>
            <input
              type="range"
              min={5}
              max={95}
              step={5}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full accent-cyan-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Side-by-Side Visual Comparison & Metrics */}
      {imageFile && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Original Image Card */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-slate-900 dark:text-slate-200">Original Image</span>
              <span className="text-slate-500">
                {(imageFile.originalSize / 1024).toFixed(1)} KB
              </span>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-2 min-h-[220px]">
              <img
                src={imageFile.originalDataUrl}
                alt="Original Preview"
                className="max-h-56 object-contain shadow"
              />
            </div>
            <div className="text-[11px] text-slate-500 font-mono text-center">
              Resolution: {imageFile.width} x {imageFile.height} px
            </div>
          </div>

          {/* Compressed Image Card */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm transition-colors">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Compressed Result ({quality}%)
              </span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">
                {(compressedSize / 1024).toFixed(1)} KB
              </span>
            </div>

            <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-900 flex items-center justify-center p-2 min-h-[220px]">
              {compressedDataUrl ? (
                <img
                  src={compressedDataUrl}
                  alt="Compressed Preview"
                  className="max-h-56 object-contain shadow"
                />
              ) : (
                <div className="text-xs text-slate-400 font-mono">Compressing image...</div>
              )}
            </div>

            <button
              onClick={handleDownload}
              disabled={isCompressing || !compressedDataUrl}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download Compressed Image</span>
            </button>
          </div>
        </div>
      )}

      {/* Output Ad Slot */}
      <AdSlotOutput />
    </div>
  );
};
