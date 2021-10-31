export type NoteItemType = {
  id: string;
  title: string;
  desc: string;
  imgUrl: string;
  date: string;
  views: number;
  tags?: string[];
};

export type UpdateViewsNoteItemType = {
  views: number;
};

export type NotesType = {
  notes: NoteItemType[];
  queryStr?: string;
};

export type NoteType = {
  note: NoteItemType;
  queryStr?: string;
  children?: never;
};

export type ActiveTagType = {
  activeTag: string;
};

export type CurrentPage = {
  currentPage: number;
};

export type PageLimit = {
  pageLimit: number;
};

export type TotalCount = {
  totalCount: number;
};

export type ConfigType = {
  [key: string]: string;
};
