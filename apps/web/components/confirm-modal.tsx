"use client";
import React from "react";
import { AlertTriangle, Trash2, X } from "lucide-react";

type ConfirmModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  isDanger = true,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-xl border border-white/15 bg-[#121214] p-6 shadow-2xl">
        <button
          onClick={onCancel}
          className="absolute right-4 top-4 rounded-full p-1 text-white/40 transition hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4">
          <div
            className={`grid size-10 shrink-0 place-items-center rounded-lg border ${
              isDanger
                ? "border-red-500/30 bg-red-500/10 text-red-400"
                : "border-[#a855f7]/30 bg-[#a855f7]/10 text-[#c084fc]"
            }`}
          >
            {isDanger ? <Trash2 size={20} /> : <AlertTriangle size={20} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-white/60">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-7 flex items-center justify-end gap-3 border-t border-white/10 pt-5 font-mono text-[10px] uppercase tracking-widest">
          <button
            type="button"
            onClick={onCancel}
            className="border border-white/15 px-5 py-3 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`border px-5 py-3 transition ${
              isDanger
                ? "border-red-500/50 bg-red-500/15 text-red-300 hover:bg-red-500 hover:text-white"
                : "border-[#a855f7] bg-[#a855f7]/15 text-[#c084fc] hover:bg-[#9333ea] hover:text-white"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
