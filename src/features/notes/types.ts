import { TagType } from '@common/components/Tags';

export type NoteType = {
  title: string;
  desc: string;
  imgUrl: string;
  date: string;
  tags: TagType[];
};

export type NotesType = {
  notes: NoteType[];
};

export type ResponseType = {
  [key: string]: any;
};
