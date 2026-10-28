'use client';

import { useEffect, useRef } from 'react';

const ADSENSE_CLIENT = 'ca-pub-1548791648803369';

export default function AdSlot({
  note = false,
  slotId,
}: {
  note?: boolean;
  slotId?: string;
}) {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    const push = () => {
      const ins = insRef.current;
      if (!ins || ins.dataset.adPushed === '1') return;
      const ads = (window as unknown as { adsbygoogle?: unknown[] }).adsbygoogle;
      if (!ads) return;
      ins.dataset.adPushed = '1';
      try {
        ads.push({});
      } catch {
        ins.dataset.adPushed = '';
      }
    };

    push();
    window.addEventListener('ads-ready', push);
    return () => window.removeEventListener('ads-ready', push);
  }, []);

  return (
    <aside className="ad-reserve" aria-label="Advertisement">
      {note ? <p className="ad-reserve-note">Ads help keep this anagram solver free.</p> : null}
      <div className="ad-reserve-frame">
        <ins
          ref={insRef}
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-format="auto"
          data-full-width-responsive="true"
          {...(slotId ? { 'data-ad-slot': slotId } : {})}
        />
      </div>
    </aside>
  );
}
