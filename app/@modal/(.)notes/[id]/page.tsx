'use client';

import Modal from '@/components/Modal/Modal';
import { useRouter } from 'next/navigation';
import NotePreviewClient from './NotePreview.client';

export default function NotePreviewPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <NotePreviewClient />
    </Modal>
  );
}
