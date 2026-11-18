import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, RotateCw, Check, RotateCcw, Smartphone, Image as ImageIcon } from 'lucide-react';

interface AvatarCropModalProps {
  isOpen: boolean;
  imageSrc: string | null;
  onClose: () => void;
  onCropComplete: (croppedDataUrl: string) => void;
}

export const AvatarCropModal: React.FC<AvatarCropModalProps> = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete
}) => {
  const [zoom, setZoom] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Dimensions of the original image once loaded
  const [imgLayout, setImgLayout] = useState<{
    naturalWidth: number;
    naturalHeight: number;
    baseWidth: number;
    baseHeight: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ x: number; y: number; origX: number; origY: number }>({
    x: 0,
    y: 0,
    origX: 0,
    origY: 0
  });
  const touchDistRef = useRef<number | null>(null);

  const VIEWPORT_SIZE = 260; // Size of the crop container in px
  const CIRCLE_SIZE = 220; // Diameter of the circle crop guide in px
  const OUTPUT_SIZE = 200; // Target optimized output size (200x200 px for mobile performance)

  // Reset transforms and measure image when imageSrc changes
  useEffect(() => {
    if (!isOpen || !imageSrc) {
      setImgLayout(null);
      setZoom(1.0);
      setRotation(0);
      setPos({ x: 0, y: 0 });
      setIsDragging(false);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const nw = img.naturalWidth || 400;
      const nh = img.naturalHeight || 400;
      const aspect = nw / nh;

      // Fit to cover the circle size
      let bw = CIRCLE_SIZE;
      let bh = CIRCLE_SIZE;
      if (aspect > 1) {
        bh = CIRCLE_SIZE;
        bw = CIRCLE_SIZE * aspect;
      } else {
        bw = CIRCLE_SIZE;
        bh = CIRCLE_SIZE / aspect;
      }

      setImgLayout({
        naturalWidth: nw,
        naturalHeight: nh,
        baseWidth: bw,
        baseHeight: bh
      });
      setZoom(1.0);
      setRotation(0);
      setPos({ x: 0, y: 0 });
    };
    img.src = imageSrc;
  }, [isOpen, imageSrc]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origX: pos.x,
      origY: pos.y
    };
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setPos({
        x: dragStartRef.current.origX + dx,
        y: dragStartRef.current.origY + dy
      });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
    }
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // Touch drag & pinch zoom handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      const t = e.touches[0];
      setIsDragging(true);
      dragStartRef.current = {
        x: t.clientX,
        y: t.clientY,
        origX: pos.x,
        origY: pos.y
      };
      touchDistRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      touchDistRef.current = dist;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && isDragging) {
      const t = e.touches[0];
      const dx = t.clientX - dragStartRef.current.x;
      const dy = t.clientY - dragStartRef.current.y;
      setPos({
        x: dragStartRef.current.origX + dx,
        y: dragStartRef.current.origY + dy
      });
    } else if (e.touches.length === 2 && touchDistRef.current !== null) {
      const newDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = newDist / touchDistRef.current;
      setZoom(prev => Math.min(3.5, Math.max(0.6, prev * ratio)));
      touchDistRef.current = newDist;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    touchDistRef.current = null;
  };

  // Rotate 90 degrees clockwise
  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  // Reset to original centered position and zoom
  const handleReset = () => {
    setZoom(1.0);
    setRotation(0);
    setPos({ x: 0, y: 0 });
  };

  // Confirm Crop and Compress to 200x200 WebP/JPEG for Mobile Optimization
  const handleConfirmCrop = async () => {
    if (!imageSrc || !imgLayout) return;
    setIsProcessing(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = OUTPUT_SIZE;
      canvas.height = OUTPUT_SIZE;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // High quality smoothing for downsampling large images
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Load original image to render onto canvas
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

        // Scale ratio from the on-screen circle size (CIRCLE_SIZE) to the output size (OUTPUT_SIZE)
        const scaleRatio = OUTPUT_SIZE / CIRCLE_SIZE;

        // Move origin to canvas center (100, 100)
        ctx.translate(OUTPUT_SIZE / 2, OUTPUT_SIZE / 2);

        // Scale coordinate system to match on-screen circle
        ctx.scale(scaleRatio, scaleRatio);

        // Apply user drag offset (scaled)
        ctx.translate(pos.x, pos.y);

        // Apply user zoom
        ctx.scale(zoom, zoom);

        // Apply rotation
        ctx.rotate((rotation * Math.PI) / 180);

        // Draw image centered at (0, 0)
        ctx.drawImage(
          img,
          -imgLayout.baseWidth / 2,
          -imgLayout.baseHeight / 2,
          imgLayout.baseWidth,
          imgLayout.baseHeight
        );

        // Compress image to optimized JPEG format (85% quality, ~15KB size)
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

        setIsProcessing(false);
        onCropComplete(optimizedDataUrl);
      };
      img.src = imageSrc;
    } catch {
      setIsProcessing(false);
    }
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="bg-white rounded-3xl max-w-sm w-full p-4 sm:p-5 shadow-2xl border-4 border-[#8C6239] relative overflow-hidden flex flex-col text-slate-800"
        >
          {/* Header */}
          <div className="flex justify-between items-center pb-2.5 border-b border-cream-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-sm shadow-xs">
                📷
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 leading-tight">
                  아바타 사진 영역 지정 (크롭)
                </h3>
                <p className="text-[10px] text-slate-500 font-medium">
                  사진을 드래그하거나 확대하여 원 안에 맞춰주세요
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Crop Viewport Canvas Area */}
          <div className="flex flex-col items-center justify-center my-3">
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{ width: `${VIEWPORT_SIZE}px`, height: `${VIEWPORT_SIZE}px` }}
              className={`relative rounded-2xl overflow-hidden bg-slate-950 border-2 border-stone-800 cursor-move touch-none flex items-center justify-center select-none shadow-inner ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              }`}
            >
              {/* The User's Scaled and Panned Image */}
              {imgLayout && (
                <img
                  src={imageSrc}
                  alt="Crop preview"
                  draggable={false}
                  style={{
                    width: `${imgLayout.baseWidth}px`,
                    height: `${imgLayout.baseHeight}px`,
                    transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.05s ease-out'
                  }}
                  className="max-none pointer-events-none select-none filter contrast-[1.02]"
                />
              )}

              {/* Circular Avatar Guide Mask with 65% Black Scrim */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div
                  style={{ width: `${CIRCLE_SIZE}px`, height: `${CIRCLE_SIZE}px` }}
                  className="rounded-full border-2 border-amber-400/95 shadow-[0_0_0_9999px_rgba(0,0,0,0.65)] relative"
                >
                  {/* Subtle Grid Guidelines */}
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-white/25 pointer-events-none" />
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[1px] bg-white/25 pointer-events-none" />
                  
                  {/* Avatar Frame Helper Badge */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/75 text-amber-300 font-extrabold text-[8.5px] px-2 py-0.5 rounded-full border border-amber-400/50 whitespace-nowrap shadow-xs">
                    아바타 표시 영역
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls: Zoom Slider, Rotate, Reset */}
          <div className="space-y-2.5 px-1 pb-1">
            {/* Zoom Slider Row */}
            <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200">
              <button
                type="button"
                onClick={() => setZoom(prev => Math.max(0.6, prev - 0.15))}
                className="p-1 rounded-lg text-stone-600 hover:bg-stone-200 active:scale-95 transition-all"
                title="축소"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <input
                type="range"
                min="0.6"
                max="3.0"
                step="0.05"
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="flex-1 accent-amber-500 cursor-pointer h-1.5 bg-stone-200 rounded-lg appearance-none"
              />

              <button
                type="button"
                onClick={() => setZoom(prev => Math.min(3.0, prev + 0.15))}
                className="p-1 rounded-lg text-stone-600 hover:bg-stone-200 active:scale-95 transition-all"
                title="확대"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <span className="text-[10px] font-black text-amber-900 w-10 text-right">
                {Math.round(zoom * 100)}%
              </span>
            </div>

            {/* Quick Action Buttons Row */}
            <div className="flex items-center justify-between gap-1.5 text-[10px] font-bold">
              <button
                type="button"
                onClick={handleRotate}
                className="flex-1 py-1.5 px-2 rounded-xl bg-stone-100 hover:bg-stone-200 active:scale-95 border border-stone-300 text-stone-700 flex items-center justify-center gap-1 transition-all"
              >
                <RotateCw className="w-3 h-3 text-stone-600" />
                <span>90° 회전</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-1.5 px-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 active:scale-95 border border-stone-300 text-stone-600 flex items-center justify-center gap-1 transition-all"
                title="위치 및 크기 초기화"
              >
                <RotateCcw className="w-3 h-3" />
                <span>초기화</span>
              </button>
            </div>

            {/* Mobile Optimization Notice Pill */}
            <div className="bg-emerald-50/90 border border-emerald-300/80 rounded-xl p-2 flex items-center gap-2 text-emerald-950 text-[10px] font-medium leading-tight">
              <Smartphone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>
                <strong>모바일 용량 최적화</strong>: 200x200 고화질 압축(~15KB)으로 자동 변환되어 게임 속도가 저하되지 않습니다.
              </span>
            </div>
          </div>

          {/* Action Buttons: Cancel & Apply */}
          <div className="flex items-center gap-2 pt-2.5 border-t border-cream-200 mt-1">
            <button
              type="button"
              onClick={onClose}
              disabled={isProcessing}
              className="flex-1 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-black text-xs transition-all active:scale-95"
            >
              취소
            </button>
            <button
              type="button"
              onClick={handleConfirmCrop}
              disabled={isProcessing}
              className="flex-2 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1"
            >
              {isProcessing ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>최적화 저장 중...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>아바타 적용하기</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
