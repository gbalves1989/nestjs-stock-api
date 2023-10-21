interface IProduct {
  id: string;
  name: string;
  description: string;
  banner: string;
}

export interface ICategory {
  id: string;
  name: string;
  Product: IProduct[];
}
