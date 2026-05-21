import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react';
import styles from './ToolShell.module.css';

interface ToolShellProps {
  title: string;
  eyebrow?: string;
  description?: string;
  backTo?: string;
  /** Right-rail action buttons (settings, reset, etc.) */
  actions?: ReactNode;
  /** The big rendered area — usually centred and projector-friendly */
  children: ReactNode;
  /** Pulled to make the main display fill viewport */
  fillViewport?: boolean;
}

export function ToolShell({
  title,
  eyebrow,
  description,
  backTo = '/dashboard',
  actions,
  children,
  fillViewport = true,
}: ToolShellProps) {
  const [isFs, setIsFs] = useState(false);

  useEffect(() => {
    function onChange() {
      setIsFs(!!document.fullscreenElement);
    }
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  return (
    <div className={styles.shell} data-fill={fillViewport}>
      <div className={`container ${styles.bar}`}>
        <div className={styles.left}>
          <Link to={backTo} className={styles.back} aria-label="Back">
            <ArrowLeft size={14} />
            <span>Back</span>
          </Link>
          <div className={styles.titles}>
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
            <h1 className={`font-display ${styles.title}`}>{title}</h1>
            {description && <p className={styles.description}>{description}</p>}
          </div>
        </div>

        <div className={styles.actions}>
          {actions}
          <button
            type="button"
            className={styles.iconBtn}
            onClick={toggleFullscreen}
            aria-label={isFs ? 'Exit full screen' : 'Enter full screen'}
            title={isFs ? 'Exit full screen' : 'Full screen'}
          >
            {isFs ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      <main className={styles.stage}>{children}</main>
    </div>
  );
}
