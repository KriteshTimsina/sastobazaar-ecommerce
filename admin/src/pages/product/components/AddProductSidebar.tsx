import React, { useEffect, useState } from "react";
import { useUser } from "../../../contexts/UserContext";
import toast from "react-hot-toast";
import { IProduct } from "../ProductsListing";
import ImagePicker, { ImagePickerProps } from "../../../components/ImagePicker";
import { url } from "../../../constants/base_url";

type FormData = {
  title: string;
  description: string;
  price: number;
  subCategoryId: string;
  categoryId: string;
};

const AddProductSidebar = ({
  showProductForm,
  setShowProductForm,
  setProducts,
}: any) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: 0,
    categoryId: "",
    subCategoryId: "",
  });
  const [image,setImage] = useState<any>([]);

console.log(image,"Y")


  useEffect(() => {
    getAllCategories();
  }, []);

  const getAllCategories = async () => {
    try {
      const response = await fetch(url+"/category");
      const data = await response.json();
      if (data.status) {
        setCategories(data.category);
      }
    } catch (error) {}
  };

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name === "categoryId") {
      setFormData({ ...formData, categoryId: value });
      const filteredSubcategory: any = categories.find(
        (category: any) => category._id === e.target.value
      );
      if (filteredSubcategory) {
        setSubCategories(filteredSubcategory.subCategories);
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (selectedImage: File) => {
    setImage((prevImages:any) => [...prevImages, selectedImage]);
    console.log(image);
  };

  const handleDelete = (index: number) => {
    const updatedImages = [...image];
    updatedImages.splice(index, 1);
    setImage(updatedImages);
  };

  const imagePickerProps: ImagePickerProps = {
    image: image,
    handleFileChange: handleFileChange,
    handleDelete: handleDelete,
  };

  const addProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!image) {
        return;
      }
      const data = new FormData();

      image.forEach((file:any, index:any) => {
        data.append(`image${index + 1}`, file);
      });

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", String(formData.price));
      data.append("categoryId", formData.categoryId);
      data.append("subCategoryId", formData.subCategoryId);

      const res = await fetch(url+"/product", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: data,
      });
      const result = await res.json();
      if (result.status) {
        setProducts((prev: any) => [...prev, result.product]);
        toast.success(result.message);
        setShowProductForm(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to add product");
    }
  };

  return (
    <div
      id="drawer-create-product-default"
      className={`overflow-y-auto fixed top-0 right-0 z-40 p-4 w-full max-w-xs h-screen bg-white transition-transform  dark:bg-gray-800 ${
        showProductForm ? "":"translate-x-full"}`}
      tabIndex={-1}
      aria-labelledby="drawer-label"
      aria-hidden="true"
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        New Product
      </h5>
      <button
        onClick={() => setShowProductForm(false)}
        type="button"
        data-drawer-dismiss="drawer-create-product-default"
        aria-controls="drawer-create-product-default"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <form action="#" onSubmit={addProduct}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              value={formData.title}
              onChange={handleFormChange}
              type="text"
              name="title"
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Type product name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Price
            </label>
            <input
              value={formData.price}
              onChange={handleFormChange}
              type="number"
              name="price"
              id="price"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="$2999"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={handleFormChange}
              id="description"
              name="description"
              rows={4}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Enter event description here"
              required
            ></textarea>
          </div>

          <ImagePicker {...imagePickerProps} />

          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Category
            </label>
            <select
              onChange={handleFormChange}
              value={formData.categoryId}
              name="categoryId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="">Select a category</option>
              {categories.map((category: any) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.title}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label
              htmlFor="discount-create"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Sub Category
            </label>
            <select
              value={formData.subCategoryId}
              onChange={handleFormChange}
              required
              disabled={formData.categoryId === ""}
              name="subCategoryId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="">Select sub category</option>
              {formData.categoryId &&
                subCategories &&
                subCategories.map((sub: any) => {
                  return (
                    <option key={sub._id} value={sub._id}>
                      {sub.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="flex justify-center pb-2 space-x-4 w-full">
            <button
              type="submit"
              className="text-white w-full justify-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Add product
            </button>
            <button
            onClick={() => setShowProductForm(false)}
              type="button"
              data-drawer-dismiss="drawer-create-product-default"
              aria-controls="drawer-create-product-default"
              className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              <svg
                aria-hidden="true"
                className="-ml-1 w-5 h-5 sm:mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProductSidebar;
