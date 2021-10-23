export interface IAttributes {
  id?: string;
  key?: string | null;
  value?: string | null;
}

export class Attributes implements IAttributes {
  constructor(public id?: string, public key?: string | null, public value?: string | null) {}
}

export function getAttributesIdentifier(attributes: IAttributes): string | undefined {
  return attributes.id;
}
