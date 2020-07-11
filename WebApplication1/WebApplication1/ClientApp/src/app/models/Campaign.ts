export interface Campaign {
  id: number,
  name: string,
  keywords: string[],
  bidAmount: number,
  fund: number,
  status: boolean,
  town: string,
  radius: number,
}
