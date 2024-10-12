import styles from './index.module.scss';
import { Copy2Clipboard, Init } from '../../hooks/use-orders';
import { useCallback, useState } from 'react';

interface Props {
  total: number;
  controller: {
    copy2clipboard: Copy2Clipboard;
    init: Init;
  };
}

export default function Controller({ total, controller }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyButton = useCallback(() => {
    controller.copy2clipboard();

    (async () => {
      setCopied(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      setCopied(false);
    })();
  }, [controller]);

  return (
    <section className={styles.controller}>
      <p className={styles.total}>{`合計: ${total}円`}</p>

      <div className={styles.buttons}>
        <button onClick={handleCopyButton} data-copied={copied}>
          クリップボード
        </button>
        <button onClick={controller.init}>初期化</button>
      </div>
    </section>
  );
}
