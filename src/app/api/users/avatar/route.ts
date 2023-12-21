import { NextResponse } from 'next/server'

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { extname } from 'path';

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

  if(!avatar || !email) {
    return NextResponse.json( { error: "Preencha todo o formulário."}, { status: 400 } );
  }

  const buffer = Buffer.from(await avatar.arrayBuffer());
  await uploadFileToS3(buffer, avatar.name, email);
  return NextResponse.json({ status: 200, response: "Avatar trocado com sucesso"});
} 