import { useEffect, useSyncExternalStore } from 'react';

interface ConfirmOptions {
  title: string;
  text?: string;
  confirmLabel: string;
  danger?: boolean;
}

interface Request extends ConfirmOptions {
  resolve: (ok: boolean) => void;
}

// In-app replacement for window.confirm, which some webviews suppress (it returns false without showing anything).
let current: Request | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());

export function confirmAction(options: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    current?.resolve(false);
    current = { ...options, resolve };
    emit();
  });
}

function close(ok: boolean) {
  const request = current;
  current = null;
  emit();
  request?.resolve(ok);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function ConfirmHost() {
  const request = useSyncExternalStore(subscribe, () => current);

  useEffect(() => {
    if (!request) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [request]);

  if (!request) return null;
  return (
    <div className="sheet-backdrop" onClick={() => close(false)}>
      <div className="sheet" role="alertdialog" aria-modal="true" aria-labelledby="confirm-title" onClick={(e) => e.stopPropagation()}>
        <h2 id="confirm-title">{request.title}</h2>
        {request.text && <p>{request.text}</p>}
        <div className="sheet__actions">
          <button className="btn btn--ghost" onClick={() => close(false)}>
            Bekor qilish
          </button>
          <button className={`btn ${request.danger ? 'btn--danger-solid' : 'btn--primary'}`} onClick={() => close(true)} autoFocus>
            {request.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
