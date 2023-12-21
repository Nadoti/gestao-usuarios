import React, {useState, useRef} from 'react';
import { PinturaEditorModal } from '@pqina/react-pintura';
import { getEditorDefaults } from '@pqina/pintura';
import '@pqina/pintura/pintura.css';
import { WidgetProps } from '@rjsf/utils';
import Image from 'next/image';


const editorDefaults = getEditorDefaults();

export function ImagePintura(props: WidgetProps) {
  const [editorSrc, setEditorSrc] = useState(null);
  const [editorEnabled, setEditorEnabled] = useState(false);  
  const fileInputRef = useRef(null);

  const handleInputChange = () => {

    if (!fileInputRef.current.files.length) return;

    setEditorEnabled(true);
    setEditorSrc(fileInputRef.current.files[0]);
    
    
  };
  const handleEditorHide = () => setEditorEnabled(false);

  const handleEditorProcess = (imageState) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(imageState.dest);
    fileInputRef.current.files = dataTransfer.files;
    setEditorSrc(URL.createObjectURL(dataTransfer.files[0]));
    props.uiSchema.uiProps.setFileImage(dataTransfer.files[0])
    
    const url = URL.createObjectURL(dataTransfer.files[0])
    props.onChange(JSON.stringify(url));
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
      />

      {editorEnabled && (
        <PinturaEditorModal
          {...editorDefaults}
          src={editorSrc}
          imageCropAspectRatio={1}
          onHide={handleEditorHide}
          onProcess={handleEditorProcess}
        />
      )}
      {editorSrc && <Image className='mt-5 rounded-full' width={150} height={150} src={editorSrc} alt="image-pintura" />}
    </>
  )
}