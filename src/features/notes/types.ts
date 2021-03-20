export type NoteItemType = {
  id?: string;
  title?: string;
  desc?: string;
  imgUrl?: string;
  date?: string;
  views?: number;
  tags?: string[];
};

export type NotesType = {
  notes: NoteItemType[];
  queryStr?: string;
};

export type NoteType = {
  note: NoteItemType;
  queryStr?: string;
};

export type ActiveTagType = {
  activeTag: string;
};

export type ConfigType = {
  [key: string]: string;
};
