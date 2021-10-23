export interface IProducts {
  id?: string;
  name?: string | null;
  description?: string | null;
  photo?: string | null;
}

export class Products implements IProducts {
  constructor(public id?: string, public name?: string | null, public description?: string | null, public photo?: string | null) {}
}

export function getProductsIdentifier(products: IProducts): string | undefined {
  return products.id;
}
