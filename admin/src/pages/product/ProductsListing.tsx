import { useEffect, useRef, useState } from "react";
import { HashLoader } from "react-spinners";
import AddProductSidebar from "./components/AddProductSidebar";
import { useUser } from "../../contexts/UserContext";
import toast from "react-hot-toast";
import EditProductSidebar from "./components/EditProductSidebar";
import { url } from "../../constants/base_url";
export type IProduct = {
  _id: string;
  title: string;
  price: number;
  category: string;
  subCategory: string;
  images: string[];
  description:string
};
const ProductsListing = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedProduct,setSelectedProduct] = useState<IProduct>()
  const productIdRef = useRef("");
  const { user } = useUser();

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(url+"/product");
      const data = await response.json();
      setTimeout(() => {
        setLoading(false);
      }, 4000);
      if (data.status) {
        setProducts(data.product);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const askForDeletePermission = (id: string) => {
    setShowDeleteConfirmation(true);
    productIdRef.current = id;
  };

  const deleteProduct = async () => {
    try {
      const res = await fetch(
       url+"/product/" + productIdRef.current,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const result = await res.json();
      if (result.status) {
        toast.success(result.message);
        const filteredProduct = products.filter(
          (product) => product._id !== result.product._id
        );
        setProducts(filteredProduct);
        setShowDeleteConfirmation(false);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <div className="py-4 bg-white dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="flex justify-between items-center px-5">
              <div className="relative mt-1">
                <div className="flex absolute inset-y-0 items-center pointer-events-none rtl:inset-r-0 start-0 ps-3">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pt-2 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 ps-10 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search htmlFor items"
                />
              </div>
              <button
                onClick={() => setShowProductForm(!showProductForm)}
                id="createProductButton"
                className="text-white bg-primary  focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                type="button"
                data-drawer-target="drawer-create-product-default"
                data-drawer-show="drawer-create-product-default"
                aria-controls="drawer-create-product-default"
                data-drawer-placement="right"
              >
                Add new product
              </button>
            </div>
          </div>
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Sub Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="w-full">
                  <td>
                    {" "}
                    <HashLoader />
                  </td>
                </tr>
              )}
              {!loading && products && products.length > 0 ? (
                products.map((product, index) => (
                  <tr
                    key={product._id}
                    className="border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4 w-4">{index + 1}</td>
                    <td
                      scope="row"
                      className="flex gap-3 items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        width={30}
                        height={30}
                        className="object-cover bg-gray-400 rounded-full"
                        src={product.images[0] ?? ""}
                        alt={product.title}
                      />
                      <p>{product.title}</p>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.subCategory}</td>
                    <td className="px-6 py-4">Rs {product.price}</td>
                    <td className="px-6 py-4 space-x-3">
                    <button onClick={() => {
                      setShowEditProductForm(true) 
                      setSelectedProduct(product)}
                      } className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Edit
                      </button>
                      <button
                        onClick={() => askForDeletePermission(product._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>No products to show</tr>
              )}
            </tbody>
          </table>
        </div>
        <AddProductSidebar
          {...{ showProductForm, setShowProductForm, setProducts }}
        />
        <EditProductSidebar
          {...{ showEditProductForm, setShowEditProductForm, setProducts,selectedProduct }}
        />
        <div
          id="drawer-delete-product-default"
          className={`overflow-y-auto fixed top-0 right-0 z-40 p-4 w-full max-w-xs h-screen bg-white transition-transform  dark:bg-gray-800 ${
            showDeleteConfirmation ? "":"translate-x-full"}`}
          tabIndex={-1}
          aria-labelledby="drawer-label"
          aria-hidden="true"
        >
          <h5
            id="drawer-label"
            className="inline-flex items-center text-sm font-semibold text-gray-500 uppercase dark:text-gray-400"
          >
            Delete item
          </h5>
          <button
            type="button"
            data-drawer-dismiss="drawer-delete-product-default"
            aria-controls="drawer-delete-product-default"
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
          <svg
            className="mt-8 mb-4 w-10 h-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 className="mb-6 text-lg text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this product?
          </h3>
          <button
            onClick={deleteProduct}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2.5 text-center mr-2 dark:focus:ring-red-900"
          >
            Yes, I'm sure
          </button>
          <button
            onClick={() => setShowDeleteConfirmation(false)}
            className="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-primary-300 border border-gray-200 font-medium inline-flex items-center rounded-lg text-sm px-3 py-2.5 text-center dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
            data-drawer-hide="drawer-delete-product-default"
          >
            No, cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductsListing;
