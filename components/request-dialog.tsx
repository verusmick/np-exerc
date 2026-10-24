"use client";

import { useEffect, useRef, type FormEvent } from "react";
import { X } from "lucide-react";

type Props = {
  context: boolean | null;
  onClose: () => void;
};

export function RequestDialog({ context, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (context && !dialog.open) {
      dialog.showModal();
    } else if (!context && dialog.open) {
      dialog.close();
    }
  }, [context]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="request-title"
      className="m-auto w-[calc(100%-2rem)] max-w-105 rounded border border-slate-200 bg-white p-5 text-slate-900 shadow-xl"
    >
      <button
        type="button"
        aria-label="Close request"
        onClick={() => dialogRef.current?.close()}
        className="float-right rounded p-1 text-slate-500 hover:bg-slate-100"
      >
        <X size={17} />
      </button>

      <h2 id="request-title" className="text-lg font-semibold">
        Request an asset
      </h2>

      <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-sm">
        <p className="text-xs leading-5 text-slate-600">
          Tell us which missing asset you need and why.
        </p>

        <div>
          <label
            htmlFor="request-name"
            className="mb-1 block text-xs font-medium"
          >
            Asset name or description
          </label>
          <input
            id="request-name"
            required
            minLength={3}
            placeholder="What asset is missing?"
            className="w-full rounded border border-slate-300 px-3 py-2"
          />
        </div>

        <div>
          <label
            htmlFor="request-reason"
            className="mb-1 block text-xs font-medium"
          >
            Details of the request
          </label>
          <textarea
            id="request-reason"
            required
            minLength={3}
            rows={3}
            placeholder=""
            className="w-full resize-y rounded border border-slate-300 px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-slate-800 py-2 text-xs font-medium text-white"
        >
          Submit request
        </button>
      </form>
    </dialog>
  );
}