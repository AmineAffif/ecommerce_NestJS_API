export class CreateProductDto {
  readonly id: number;
  readonly name: string;
  readonly price: number;
  readonly description: string;
  readonly inventory: number;
  readonly imageUrl: string;

  // Autres propriétés selon le besoin
}
