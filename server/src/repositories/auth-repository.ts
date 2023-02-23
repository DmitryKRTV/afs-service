const __products = [
  { id: 1, title: "tomato" },
  { id: 2, title: "orange" },
];
export const authRepository = {
  async findProducts(title: string | null | undefined): Promise<ProductType[]> {
    const filter: any = {};
    if (title) {
      filter.title = { $regex: title };
    }
    return [];
  },
};

export type ProductType = {
  id: number;
  title: string;
};
