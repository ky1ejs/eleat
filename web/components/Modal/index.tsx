"use client";

import { PropsWithChildren, ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export type DialogProps = {
  title?: string;
  description?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
} & PropsWithChildren;

const defaultProps: DialogProps = { open: false, onOpenChange: () => {} };

export const Modal = ({
  title,
  description,
  children,
  open,
  onOpenChange,
  trigger,
}: DialogProps = defaultProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
    <Dialog.Portal>
      <Dialog.Overlay className="overlay" />
      <Dialog.Content className="modal">
        {title && <Dialog.Title>{title}</Dialog.Title>}
        {description && <Dialog.Description>{description}</Dialog.Description>}
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);
