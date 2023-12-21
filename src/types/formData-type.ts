export interface FormDataWithFile extends FormData {
  appendWithFile(name: string, value: Blob, fileName?: string): void;
}