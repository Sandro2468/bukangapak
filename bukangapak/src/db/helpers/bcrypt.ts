import bcryptjs from "bcryptjs";


export const compareTextWithHash = (text: string, hash:string): boolean =>
    bcryptjs.compareSync(text, hash)