interface ICategory {
  id: string;
  name: string;
}

export interface IProduct {
  id: string;
  name: string;
  description: string;
  banner: string;
  category: ICategory;
}
