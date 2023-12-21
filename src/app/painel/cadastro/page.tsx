"use client"
import validator from '@rjsf/validator-ajv8';
import Form from "@rjsf/antd"
import { RJSFSchema, SubmitButtonProps, getSubmitButtonOptions  } from '@rjsf/utils';
import React from 'react';
import '@pqina/pintura/pintura.css';
import { ImagePintura } from '@/components/ImagePintura';
import { useRouter } from "next/navigation"
import { RegisterUser } from '@/api/register-user';
import { createFormDataWithFile } from '@/utils/form-data';
import { InputDate } from '@/components/InputDate';
import { formatDate } from '@/utils/formatDate';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const schema: RJSFSchema = {
  type: 'object',
  required: ['nome', 'email', 'dateBirth', "avatar"],
  properties: {
    nome: {
      type: "string",
      title: "Nome",
    },
    email: {
      type: "string",
      title: "Email",
      format: 'email',
    },
    dateBirth: {
      type: "number",
      title: "Data de Nascimento",
      format: "date"
    },
    avatar: {
      type: 'string',
      title: 'Avatar',
    },
  },
};

const widgets   = {
  'ImageUploader': ImagePintura,
  'DateWidget': InputDate,
};

function SubmitButton(props: SubmitButtonProps) {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <button type='submit' className='inline-block py-1 px-6 text-white rounded-lg transition-all bg-green-600 border-2 hover:bg-transparent hover:text-green-600 hover:border-green-600'>
      Cadastrar
    </button>
  );
}

export default function Register() {
  const [isLoadingRegisterUser, setIsLoadingRegisterUser] = React.useState(false)
  const router = useRouter()

  const [fileImage, setFileImage] = React.useState(null)
  const uiSchema = {
    dateBirth: {
      'ui:widget': 'DateWidget',
    },
    avatar: {
      'ui:widget': 'ImageUploader',
      'ui:widgetFile': 'file',
      'uiProps': {
        setFileImage: setFileImage,
      },
    },
  }
  
  const onSubmit = async (dataForm) => {
    setIsLoadingRegisterUser(true)
    const file = JSON.parse(dataForm.formData.avatar)
    const data = await fetch(file)
    const response = await data.blob()
    const convertedFile = new File([response], fileImage.name, { type: fileImage.type
    });

    const formattedDate = formatDate(dataForm.formData.dateBirth)
  
    const formData = createFormDataWithFile();

    formData.append("name", dataForm.formData.nome);
    formData.append("email", dataForm.formData.email);
    formData.append("dateBirth", formattedDate);
    formData.append("avatar", convertedFile);

    const registerUser = await RegisterUser(formData)
    
    if(registerUser) {
      setTimeout(() => {
        router.push("/painel/usuarios")
      }, 3000);
    }
    setIsLoadingRegisterUser(false)
  };


  return (
    <main className="w-full max-w-7xl mx-auto">
      <div className="w-full max-w-3xl mx-auto  bg-gray-50 py-6 px-4 rounded-lg">
        <Form
          schema={schema}
          validator={validator}
          onSubmit={onSubmit}
          uiSchema={uiSchema}
          widgets={widgets}
          templates={{ ButtonTemplates: { SubmitButton } }}
          
        />
      </div>
      {isLoadingRegisterUser && <LoadingSpinner />}
    </main>
  )
}

