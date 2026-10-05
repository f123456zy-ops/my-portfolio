import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";

function canUseNativeDialog() {
  return typeof window !== "undefined" &&
    typeof window.HTMLDialogElement !== "undefined" &&
    typeof window.HTMLDialogElement.prototype.showModal === "function";
}

export function MediaDialog({ item, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const nativeDialog = canUseNativeDialog();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return undefined;
    }

    if (nativeDialog && !dialog.open) {
      dialog.showModal();
    }
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        dialog.querySelector("video")?.pause();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = [...dialog.querySelectorAll(
        'button, a[href], video[controls], [tabindex]:not([tabindex="-1"])',
      )].filter((node) => !node.hasAttribute("disabled"));
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      dialog.querySelector("video")?.pause();
      if (nativeDialog && dialog.open) {
        dialog.close();
      }
    };
  }, [nativeDialog, onClose]);

  const handleBackdrop = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const content = (
    <div className="media-dialog__surface">
      <button
        ref={closeButtonRef}
        className="media-dialog__close"
        type="button"
        aria-label="关闭项目"
        onClick={onClose}
      >
        <X aria-hidden="true" weight="bold" />
      </button>
      <div className="media-dialog__media">
        {item.video ? (
          <video controls preload="metadata" poster={item.image} playsInline>
            <source src={item.video} type="video/mp4" />
          </video>
        ) : (
          <img src={item.image} alt={item.alt} />
        )}
      </div>
      <div className="media-dialog__copy">
        <p>{item.discipline}</p>
        <h2 id="media-dialog-title">{item.title}</h2>
        <p>{item.summary}</p>
        <strong>{item.outcome}</strong>
      </div>
    </div>
  );

  if (nativeDialog) {
    return (
      <dialog
        ref={dialogRef}
        className="media-dialog"
        aria-labelledby="media-dialog-title"
        onCancel={(event) => {
          event.preventDefault();
          onClose();
        }}
        onMouseDown={handleBackdrop}
      >
        {content}
      </dialog>
    );
  }

  return (
    <div
      ref={dialogRef}
      className="media-dialog media-dialog--fallback"
      role="dialog"
      aria-modal="true"
      aria-labelledby="media-dialog-title"
      tabIndex={-1}
      onMouseDown={handleBackdrop}
    >
      {content}
    </div>
  );
}
