import Modal from '@/components/Modal/Modal';
import NoteDetailsClient from '@/app/notes/[id]/NoteDetails.client';

export default function NotePreviewModal() {
  return (
    <Modal>
      <NoteDetailsClient />
    </Modal>
  );
}
