import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { GAME_COMPONENTS } from '../games/registry';
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

export function GameRouter() {
  const { id } = useParams();
  if (!id) return <ToolPlaceholder />;

  const Component = GAME_COMPONENTS[id];
  if (!Component) return <ToolPlaceholder />;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
}
