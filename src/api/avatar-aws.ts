import axios from "axios";


export async function avatarAws(email:string) {
  return await axios.get(`https://looplex-aws-storage.s3.sa-east-1.amazonaws.com/${email}`, { responseType: 'arraybuffer' })
}