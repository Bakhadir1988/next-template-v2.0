// dialog.tsx
import * as React from 'react';

import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

import styles from './dialog.module.scss';
import { DialogProps } from './dialog.types';
import { dialogVariants } from './dialog.variants';

export const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      className,
      width, // Достаем наш новый пропс size
      children,
      trigger,
      title,
      description,
      hideTitle,
      open,
      onOpenChange,
      ...props
    },
    ref,
  ) => {
    return (
      <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
        <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className={styles.overlay} />
          {/* Применяем варианты CVA для генерации классов */}
          <DialogPrimitive.Content
            ref={ref}
            className={dialogVariants({ width, className })}
            {...props}
          >
            {title &&
              (hideTitle ? (
                <DialogPrimitive.Title asChild>
                  <span className={styles.title_hidden}>{title}</span>
                </DialogPrimitive.Title>
              ) : (
                <DialogPrimitive.Title className={styles.title}>
                  {title}
                </DialogPrimitive.Title>
              ))}

            {description && (
              <DialogPrimitive.Description className={styles.description}>
                {description}
              </DialogPrimitive.Description>
            )}
            {children}
            <DialogPrimitive.Close asChild>
              <button className={styles.closeButton} aria-label="Close">
                <Cross2Icon />
              </button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  },
);

Dialog.displayName = 'Dialog';
