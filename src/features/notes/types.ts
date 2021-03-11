import { TagType } from '@common/components/Tags';

export type NoteItemType = {
  id?: string;
  title?: string;
  desc?: string;
  imgUrl?: string;
  date?: string;
  views?: number;
  tags?: TagType[];
};

export type NotesType = {
  notes: NoteItemType[];
};

export type NoteType = {
  note: NoteItemType;
};
