import { motion, type Variants } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Dialog, DialogButton, DialogDescription, DialogRoot, DialogTitle } from '~/components/ui/Dialog';
import { IconButton } from '~/components/ui/IconButton';
import { ThemeSwitch } from '~/components/ui/ThemeSwitch';
import { db, deleteById, getAll, chatId, type ChatHistoryItem } from '~/lib/persistence';
import { cubicEasingFn } from '~/utils/easings';
import { logger } from '~/utils/logger';
import { HistoryItem } from './HistoryItem';
import { binDates } from './date-binning';

const menuVariants = {
  closed: {
    opacity: 0,
    visibility: 'hidden',
    left: '-150px',
    transition: {
      duration: 0.2,
      ease: cubicEasingFn,
    },
  },
  open: {
    opacity: 1,
    visibility: 'initial',
    left: 0,
    transition: {
      duration: 0.2,
      ease: cubicEasingFn,
    },
  },
} satisfies Variants;

type DialogContent = { type: 'delete'; item: ChatHistoryItem } | { type: 'deleteAll' } | null;

export function Menu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const [list, setList] = useState<ChatHistoryItem[]>([]);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<DialogContent>(null);

  const loadEntries = useCallback(() => {
    if (db) {
      getAll(db)
        .then((list) => list.filter((item) => item.urlId && item.description))
        .then(setList)
        .catch((error) => toast.error(error.message));
    }
  }, []);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const closeDialog = () => {
    setDialogContent(null);
  };

  const onDelete = async () => {
    if (!dialogContent || !db) return;

    try {
      if (dialogContent.type === 'delete') {
        await deleteById(db, dialogContent.item.id);
      } else if (dialogContent.type === 'deleteAll') {
        // Delete all chats one by one
        for (const item of list) {
          await deleteById(db, item.id);
        }
      }
      loadEntries();
      closeDialog();
    } catch (error) {
      logger.error(error);
      toast.error('Failed to delete chat(s)');
    }
  };

  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      if (!menuRef.current) return;

      const { clientX } = event;
      const threshold = 100;

      if (clientX <= threshold) {
        setOpen(true);
      } else if (clientX >= 250) {
        setOpen(false);
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const binnedDates = binDates(list).map((bin) => [bin.category, bin.items] as const);

  return (
    <>
      <motion.div
        ref={menuRef}
        variants={menuVariants}
        animate={open ? 'open' : 'closed'}
        className="fixed top-0 bottom-0 z-50 w-60 bg-bolt-elements-background-depth-2 border-r border-bolt-elements-border flex flex-col"
      >
        <div className="flex items-center justify-end p-4 border-b border-bolt-elements-border">
          <ThemeSwitch />
        </div>

        <div className="flex-1 overflow-y-auto px-2 py-4">
          {binnedDates.map(([date, items]) => (
            <div key={date} className="mb-6 last:mb-0">
              <div className="px-2 mb-2">
                <h3 className="text-xs font-medium text-bolt-elements-textTertiary uppercase tracking-wider">{date}</h3>
              </div>
              <div className="space-y-1">
                {items.map((item: ChatHistoryItem) => (
                  <HistoryItem
                    key={item.id}
                    item={item}
                    onDelete={(event) => {
                      event.preventDefault();
                      setDialogContent({ type: 'delete', item });
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 text-bolt-elements-textTertiary">
              <div className="i-ph:chat-centered-dots text-3xl mb-2 opacity-50" />
              <p className="text-sm">No chat history yet</p>
              <p className="text-xs mt-1">Start a new chat to see it here</p>
            </div>
          )}
        </div>

        {list.length > 0 && (
          <div className="p-4 border-t border-bolt-elements-border">
            <button
              onClick={() => setDialogContent({ type: 'deleteAll' })}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm text-bolt-elements-item-contentDanger hover:bg-bolt-elements-item-backgroundDanger rounded-md transition-colors duration-200"
            >
              <div className="i-ph:trash" />
              Delete All Chats
            </button>
          </div>
        )}
      </motion.div>

      <DialogRoot open={!!dialogContent} onOpenChange={() => closeDialog()}>
        <Dialog>
          <DialogTitle>{dialogContent?.type === 'deleteAll' ? 'Delete all chats' : 'Delete chat'}</DialogTitle>
          <DialogDescription>
            {dialogContent?.type === 'deleteAll'
              ? 'Are you sure you want to delete all your chats? This action cannot be undone.'
              : 'Are you sure you want to delete this chat? This action cannot be undone.'}
          </DialogDescription>
          <div className="mt-6 flex justify-end gap-3">
            <DialogButton type="secondary" onClick={closeDialog}>
              Cancel
            </DialogButton>
            <DialogButton type="danger" onClick={onDelete}>
              {dialogContent?.type === 'deleteAll' ? 'Delete All' : 'Delete'}
            </DialogButton>
          </div>
        </Dialog>
      </DialogRoot>
    </>
  );
}
