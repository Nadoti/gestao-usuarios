import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { extname } from 'path';

const prisma = new PrismaClient()
const region = process.env.AWS_S3_REGION;
const accessKeyId = process.env.AWS_S3_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_S3_SECRET_ACCESS_KEY;

if (!region || !accessKeyId || !secretAccessKey) {
  throw new Error('As variáveis de ambiente devem ser definidas.');
}

const s3Client = new S3Client({
	region: region,
	credentials: {
		accessKeyId: accessKeyId,
		secretAccessKey: secretAccessKey,
	}
});

function getFileContentType(fileExtension: string) {
  switch (fileExtension) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.jfif':
      return 'image/jfif';
    default:
      return 'application/octet-stream'; // Tipo de conteúdo padrão
  }
}


async function uploadFileToS3(file, fileName, email) {

	const fileBuffer = file;
  const fileExtension = extname(fileName).toLowerCase();
  const contentType = getFileContentType(fileExtension);

	const params = {
		Bucket: process.env.AWS_S3_BUCKET_NAME,
		Key: `${email}`,
		Body: fileBuffer,
		ContentType: contentType
	}

	const command = new PutObjectCommand(params);
	await s3Client.send(command);
	return fileName;
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = formData.get("email");
  const avatar: File | null = formData.get("avatar") as File | null;
  const name: FormDataEntryValue | string | null = formData.get("name");
  const dateBirth: Date | string | null = formData.get("dateBirth") as Date | null;

  if(!avatar || !email || !name || !dateBirth) {
    return NextResponse.json({ status: 400, error: "Preencha todo o formulário"} );
  }
  const users = await prisma.users.findMany()

  const isEmailExist = users.find((user) => {
    return user.email === email
  })

  if(isEmailExist) return NextResponse.json({ status: 400, error: "Email já cadastrado"} )
  
  const buffer = Buffer.from(await avatar.arrayBuffer());
  await uploadFileToS3(buffer, avatar.name, email);
  await prisma.users.create({
    data: {
      dateBirth: new Date(dateBirth),
      email: String(email),
      name: String(name)
    }
  })
  
  return NextResponse.json({ status: 200, response: "Usuário criado com sucesso"});
	
}


export async function GET(request: NextRequest) {
  
  const users = await prisma.users.findMany()
  
  return NextResponse.json({ status: 200, users});

}