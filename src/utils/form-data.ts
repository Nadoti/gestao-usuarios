import { FormDataWithFile } from "@/types/formData-type";

export function createFormDataWithFile(): FormDataWithFile {
  const formData = new FormData() as FormDataWithFile;

  formData.appendWithFile = function(name: string, value: Blob, fileName?: string): void {
    this.append(name, value, fileName);
  };

  return formData;
}