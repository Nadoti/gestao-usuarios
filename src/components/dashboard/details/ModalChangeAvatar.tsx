"use client"
import validator from '@rjsf/validator-ajv8';
import Form from "@rjsf/antd"
import { RJSFSchema, SubmitButtonProps, getSubmitButtonOptions} from '@rjsf/utils';
import React from 'react';
import '@pqina/pintura/pintura.css';
import { ImagePintura } from '@/components/ImagePintura';
import { createFormDataWithFile } from '@/utils/form-data';
import { ChangeAvatar } from '@/api/change-avatar';
import { LoadingSpinner } from '@/components/LoadingSpinner';

type IModalChangeAvatar = {
  email:string;
  setIsModalAvatarOpen: (data: string) => void
}

const schema: RJSFSchema = {
  type: 'object',
  title: "Trocar Avatar",
  required: ['avatar'],
  properties: {
    avatar: {
      type: 'string',
      title: 'Avatar',
    },
  },
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

const widgets   = {
  'ImageUploader': ImagePintura,
};

export function ModalChangeAvatar({ email, setIsModalAvatarOpen }: IModalChangeAvatar) {
  const [fileImage, setFileImage] = React.useState(null)
  const [isLoadingChangeAvatar, setIsLoadingChangeAvatar] = React.useState(false)

  const uiSchema = {
    avatar: {
      'ui:widget': 'ImageUploader',
      'ui:widgetFile': 'file',
      'uiProps': {
        setFileImage: setFileImage,
      },
    },
  }

  async function onSubmit (dataForm) {
    setIsLoadingChangeAvatar(true)
    const file = JSON.parse(dataForm.formData.avatar)
    const data = await fetch(file)
    const response = await data.blob()
    const convertedFile = new File([response], fileImage.name, { type: fileImage.type
    });
    const formData = createFormDataWithFile();

    formData.append("avatar", convertedFile);
    formData.append("email", email);

    const responseDelete = await ChangeAvatar(formData)

    if(responseDelete) {
      setIsModalAvatarOpen("close")
      setIsLoadingChangeAvatar(false)
    }
  };

  return (
    <div className='w-full h-full flex items-center justify-center absolute bg-[rgba(0,0,0,0.3)] inset-0'>
      <div className='w-full max-w-3xl h-96 flex items-center justify-center bg-slate-100 rounded-lg py-10 px-5'>
        <Form
          schema={schema}
          validator={validator}
          onSubmit={onSubmit}
          uiSchema={uiSchema}
          widgets={widgets}
          templates={{ ButtonTemplates: { SubmitButton } }}
        />
      </div>
      {isLoadingChangeAvatar && <LoadingSpinner />}
    </div>
  )
}