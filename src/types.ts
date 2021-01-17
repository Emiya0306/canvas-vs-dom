export type Column = {
  idx: number;
  uuid: number;
  name: string;
  alias: string;
  dataType: string;
}

export type LookupTable = {
  // Table Info
  idx: number;
  uuid: number;
  name: string;
  alias: string;
  columns: Array<Column>;
  // Canvas Info
  x: number;
  y: number;
  width: number;
  height: number;
}
