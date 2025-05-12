export type UserTrophy = {
  trophy_id: string
  user_id: string
  date: number | string
  trophy: {
    id_firebase: string
    name: string
    picture_url: string
  }
}
