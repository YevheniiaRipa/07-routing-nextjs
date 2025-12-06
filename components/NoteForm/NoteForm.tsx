'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Formik,
  Form,
  Field,
  ErrorMessage as FormikErrorMessage,
} from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createNote } from '@/lib/api';
import type { NewNote } from '@/lib/api';
import css from './NoteForm.module.css';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  content: Yup.string().max(500, 'Too Long!'),
  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'])
    .required('Required'),
});

interface NoteFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

function NoteForm({ onSuccess, onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();

  const { mutate: createNoteMutation, isPending } = useMutation({
    mutationFn: createNote,
  });

  const handleSubmit = (values: NewNote, actions: FormikHelpers<NewNote>) => {
    createNoteMutation(values, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        toast.success('Note created successfully!');
        onSuccess();
      },
      onError: () => {
        toast.error(
          'Failed to create the note. Please check your input and try again.'
        );
      },
      onSettled: () => {
        actions.setSubmitting(false);
      },
    });
  };

  return (
    <Formik
      initialValues={{ title: '', content: '', tag: 'Todo' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <FormikErrorMessage
            name="title"
            component="span"
            className={css.error}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            id="content"
            name="content"
            as="textarea"
            rows={8}
            className={css.textarea}
          />
          <FormikErrorMessage
            name="content"
            component="span"
            className={css.error}
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field id="tag" name="tag" as="select" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <FormikErrorMessage
            name="tag"
            component="span"
            className={css.error}
          />
        </div>
        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isPending}
          >
            {isPending ? 'Creating...' : 'Create note'}
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;
