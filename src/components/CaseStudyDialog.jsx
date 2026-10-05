import { useEffect, useRef } from "react";

function supportsNativeDialog() {
  return (
    typeof window !== "undefined" &&
    typeof window.HTMLDialogElement !== "undefined" &&
    typeof window.HTMLDialogElement.prototype.showModal === "function"
  );
}

export function CaseStudyDialog({ item, onClose }) {
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const nativeDialog = supportsNativeDialog();
  const titleId = `case-dialog-title-${item.id}`;

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

      const focusable = [
        ...dialog.querySelectorAll(
          'button, a[href], video[controls], [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((node) => !node.hasAttribute("disabled"));

      if (!focusable.length) {
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
    <div className="case-dialog__surface">
      <header className="case-dialog__header">
        <p>{item.discipline}</p>
        <h2 id={titleId}>{item.title}</h2>
        <p>{item.period}</p>
        <button
          ref={closeButtonRef}
          className="case-dialog__close"
          type="button"
          aria-label={`关闭案例：${item.title}`}
          onClick={onClose}
        >
          关闭
        </button>
      </header>

      <div className="case-dialog__body">
        <section>
          <h3>项目背景与目标</h3>
          <p>{item.context}</p>
        </section>

        <section>
          <h3>我的职责</h3>
          <p>{item.role}</p>
          <ul>
            {item.responsibilities.map((responsibility) => (
              <li key={responsibility}>{responsibility}</li>
            ))}
          </ul>
        </section>

        <section>
          <h3>内容与制作流程</h3>
          <ol>
            {item.process.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="case-dialog__media-section">
          <h3>代表画面与交付物</h3>
          <div className="case-dialog__media">
            {item.video ? (
              <video controls preload="metadata" poster={item.image} playsInline>
                <source src={item.video} type="video/mp4" />
              </video>
            ) : (
              <img src={item.image} alt={item.alt} />
            )}
          </div>
        </section>

        <section>
          <h3>结果与经验总结</h3>
          <p>{item.outcome}</p>
        </section>
      </div>
    </div>
  );

  if (nativeDialog) {
    return (
      <dialog
        ref={dialogRef}
        className="case-dialog"
        aria-labelledby={titleId}
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
      className="case-dialog case-dialog--fallback"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      onMouseDown={handleBackdrop}
    >
      {content}
    </div>
  );
}
