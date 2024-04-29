import { useEffect, useState } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import CreatableSelect from 'react-select/creatable'
import { MultiValue } from 'react-select'
import ReactMarkdown from 'react-markdown'

import { useTagsStore } from 'store/useTagsStore'

import { Input } from 'components/ui/form/input'
import { Textarea } from 'components/ui/form/textarea'
import { Button } from 'components/ui/button'

import { noteSchema } from 'entities/note/schema'
import { NoteFormData } from 'entities/note/types'

import { Note, Tag } from 'types'

import styles from './note-form.module.scss'

type NoteFormProps = {
  onSubmit: SubmitHandler<NoteFormData>
  onCancel?: () => void
  noteData?: Note
}

export const NoteForm = ({ onSubmit, onCancel,  noteData }: NoteFormProps) => {
  const { tags, createTag } = useTagsStore()
  const [selectedTags, setSelectedTags] = useState<Tag[]>(noteData?.tags || [])
  const [bodyPreview, setBodyPreview] = useState(noteData?.markdown ?? '')

  const {
    handleSubmit,
    register,
    setValue,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<NoteFormData>({
    defaultValues: {
      id: noteData?.id ?? '',
      title: noteData?.title ?? '',
      markdown: noteData?.markdown ?? '',
      tags: noteData?.tags ?? [],
    },
    resolver: zodResolver(noteSchema),
  })

  useEffect(() => {
    setValue('tags', selectedTags, { shouldDirty: true })
  }, [selectedTags, setValue])

  const handleCreateTag = async (name: string) => {
    const tag = await createTag({ name })
    setSelectedTags((prevState) => [...prevState, tag])
  }

  const handleTagsChange = (tags: MultiValue<{ label: string; value: string; }>) => {
    setSelectedTags(tags.map(({ label: name, value }) => ({name, id: value})))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.twoCols}>
        <Input
          register={() => register('title')}
          label="Title"
          error={errors.title?.message}
        />

        <label>
          <div className={styles.tagsLabel}>Tags</div>
          <CreatableSelect
            options={tags.map(({id, name}) => ({ label: name, value: id }))}
            value={selectedTags.map(({id, name}) => ({ label: name, value: id }))}
            onChange={handleTagsChange}
            onCreateOption={handleCreateTag}
            isMulti
          />
          {errors.tags && <div>No tags: {errors.tags.message}</div>}
        </label>
      </div>

      <div className={styles.twoCols}>
        <Textarea
          register={() => register('markdown', {
            onChange: (e) => setBodyPreview(e.target.value),
          })}
          label="Body"
          error={errors.markdown?.message}
          fieldClassName={styles.bodyField}
        />
        <div>
          <span>Preview</span>
          <ReactMarkdown className={styles.bodyPreview}>{bodyPreview}</ReactMarkdown>
        </div>
      </div>
      <input type="hidden" {...register('id')} />

      <div className={styles.actionButtonsContainer}>
        <Button className={styles.submitBtn} type="submit" disabled={isSubmitting}>Save</Button>
        {onCancel && <Button onClick={onCancel} disabled={isSubmitting}>Cancel</Button>}
      </div>

      {errors.root && <div className={styles.formInputError}>{errors.root.message}</div>}
      {isSubmitting && <div>Submitting...</div>}
    </form>
  )
}
