import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { TOOL_COMPONENTS } from '../tools/registry';
import { ToolPlaceholder } from './ToolPlaceholder';
import styles from './Page.module.css';

function LoadingFallback() {
  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.placeholderWrap}>
          <p className={`eyebrow ${styles.placeholderEyebrow}`}>Loading</p>
          <p className={styles.placeholderDesc}>One moment…</p>
        </div>
      </div>
    </div>
  );
}

/**
 * Dispatches /tool/:id to the real component when it's registered,
 * or falls back to the "coming soon" placeholder.
 */
export function ToolRouter() {
  const { id } = useParams();
  if (!id) return <ToolPlaceholder />;

  const Component = TOOL_COMPONENTS[id];
  if (!Component) return <ToolPlaceholder />;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
}
