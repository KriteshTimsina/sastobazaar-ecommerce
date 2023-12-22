import React, { useState } from "react";
import { MdDelete } from "react-icons/md";

export interface ImagePickerProps {
  image: File[];
  handleFileChange: (selectedImage: File) => void;
  handleDelete: (index: number) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  image,
  handleFileChange,
  handleDelete,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: File[] = Array.from(e.target.files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
      handleFileChange(newFiles[0]); 
    }
  };

  const onDelete = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    handleDelete(index);
  };

  return (
    <div>
      <div>
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Image
        </label>
        <button
          type="button"
          className="inline-flex relative items-center px-3 py-2 w-full text-sm font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <input
            required
            accept="image/*"
            type="file"
            onChange={handleChange}
            className="absolute top-0 right-0 bottom-0 left-0 opacity-0"
            multiple
          />
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z"></path>
            <path d="M9 13h2v5a1 1 0 11-2 0v-5z"></path>
          </svg>
          Upload picture
        </button>

        <div className="py-1 flex gap-2 flex-col w-full">
          {selectedFiles.map((file, index) => (
            <div className="relative" key={index}>
              <img
                src={URL.createObjectURL(file)}
                alt={`Image ${index + 1}`}
                className="rounded-2xl"
              />

              <button
                onClick={() => onDelete(index)}
                className="absolute right-0 top-0 text-4xl bg-gray-400 rounded-xl text-black "
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;
