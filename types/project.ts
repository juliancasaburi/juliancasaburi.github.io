export interface Project {
  image: string;
  title: string;
  desc: string;
  repo: string;
  preview: string | null;
  tags: Tag[];
}


export interface Tag {
  name: string;
}
