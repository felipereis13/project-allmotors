import { useEffect, useRef } from 'react';

export function Icon({ type }) {
  if (type === 'search')
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5" />
      </svg>
    );
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true">
      {type === 'bolt' ? (
        <path d="m16 2-9 14h7l-2 10 10-15h-8z" />
      ) : type === 'battery' ? (
        <>
          <rect x="4" y="7" width="19" height="14" rx="3" />
          <path d="M25 11v6M9 11v6m5-6v6m5-6v6" />
        </>
      ) : (
        <path d="M23 4C8 2 3 9 7 17s18 3 16-13ZM5 25l14-15" />
      )}
    </svg>
  );
}

export function Brand() {
  return (
    <a className="brand" href="#inicio" aria-label="All Motors início">
      <img src="/assets/allmotors-logo.png" alt="Logo All Motors" />
      <span className="brand-name">
        <strong>ALL MOTORS</strong>
        <small>ENERGIA QUE MOVE VIDAS</small>
      </span>
    </a>
  );
}

export function Dialog({
  id,
  titleId,
  label,
  descriptionId,
  initialFocusSelector,
  onClose,
  children,
}) {
  const ref = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    if (initialFocusSelector)
      dialog.querySelector(initialFocusSelector)?.focus();
    return () => {
      dialog.close();
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [initialFocusSelector]);
  return (
    <dialog
      ref={ref}
      id={id}
      aria-labelledby={titleId}
      aria-label={label}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <button
        className="close"
        type="button"
        aria-label={
          id === 'unit-dialog'
            ? 'Fechar escolha de unidade'
            : 'Fechar comparação'
        }
        onClick={onClose}
      >
        ×
      </button>
      {children}
    </dialog>
  );
}
