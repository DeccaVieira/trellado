export type Task = {
  id:number,
  description:string,
  deadline:Date,
  username_responsible: string,
  status: string,
last_update:Date
}
export type ResponseDel = {
  messageDelete : string
}
export type ResponsePut = {
  messagePut : string
}
export type ResponsePutSuccess = {
  messagePut : string
}

export type ResponseGet = {
  messagePut : string
}

export type ResponsePost = {
  messagePut : string
}

export type MessageErrors = {
  messageError: string
}