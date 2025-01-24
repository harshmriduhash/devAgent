import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useRef, useState } from 'react';
import { type ChatHistoryItem } from '~/lib/persistence';

interface HistoryItemProps {
  item: ChatHistoryItem;
  onDelete?: (event: React.MouseEvent) => void;
}

export function HistoryItem({ item, onDelete }: HistoryItemProps) {
  const [hovering, setHovering] = useState(false);
  const hoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    function mouseEnter() {
      setHovering(true);
      if (timeout) clearTimeout(timeout);
    }

    function mouseLeave() {
      timeout = setTimeout(() => setHovering(false), 150);
    }

    const el = hoverRef.current;
    if (el) {
      el.addEventListener('mouseenter', mouseEnter);
      el.addEventListener('mouseleave', mouseLeave);

      return () => {
        el.removeEventListener('mouseenter', mouseEnter);
        el.removeEventListener('mouseleave', mouseLeave);
        if (timeout) clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div ref={hoverRef} className="group relative rounded-md transition-all duration-200 ease-in-out">
      <a
        href={`/chat/${item.urlId}`}
        className="block px-3 py-2 text-sm text-bolt-elements-textSecondary hover:text-bolt-elements-textPrimary hover:bg-bolt-elements-background-depth-3 rounded-md transition-colors duration-200"
      >
        <div className="truncate pr-8">{item.description}</div>
        {hovering && (
          <button
            onClick={onDelete}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-bolt-elements-textTertiary hover:text-bolt-elements-item-contentDanger hover:bg-bolt-elements-item-backgroundDanger transition-colors duration-200"
          >
            <div className="i-ph:trash scale-110" />
          </button>
        )}
      </a>
    </div>
  );
}
