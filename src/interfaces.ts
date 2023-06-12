export interface Log {
  scene: string,
  member: Member[],
  lines: (string | number | string[])[][][],
}
export interface Member {
  name: string,
  name_id: string,
  hp: number,
  c_hp: number,
  mp: number,
  c_mp: number,
  damage?: boolean,
  heal?: boolean,
  speaking?: boolean,
}
