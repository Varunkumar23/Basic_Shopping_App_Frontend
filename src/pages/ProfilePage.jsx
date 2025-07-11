import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { useMyContext } from "../context/MyContext";

const ProfilePage = () => {
  const { setCount } = useMyContext();
  const [products, setProducts] = useState([]);
  const [productId, editProductId] = useState("");
  const [updatedPrice, setUpdatedprice] = useState(-1);

  const getData = async () => {
    try {
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "GET",
      });
      const result = await resp.json();
      console.log("result-->", result);
      setProducts(result.data.products);
    } catch (err) {
      console.log("error while getting the products------->", err.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const title = e.target.title.value;
      const price = e.target.price.value;
      const quantity = e.target.quantity.value;
      const description = e.target.description.value;
      const resp = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`, {
        method: "POST",
        body: JSON.stringify({
          title,
          price,
          description,
          quantity,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      if (resp.status == "201") {
        alert("Product added!");
        getData();
        console.log(resp);
      } else {
        const result = await resp.json();
        alert(`Invalid data: ${result.message}`);
      }
    } catch (err) {
      console.warn("Cannot create product------>", err.message);
      alert(`Cannot create the product ${err.message}`);
    }
  };

  const handleEditProduct = async (productId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            price: updatedPrice,
          }),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (res.status == 200) {
        alert("Product Updated!");
      } else {
        const result = await res.json();
        alert("Error while updating product", result.message);
      }
    } catch (err) {
      alert("Cannot update product: ", err.message);
      console.log("Cannot update products: ", err.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {
        console.log("Product deleted successfully", data);
        getData();
      } else {
        console.error("Failed to delete the product", data.message);
      }
    } catch (err) {
      console.error("Error in Deleting the Product:", err.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto my-4 flex flex-col gap-5 p-6 bg-blue-200 max-w-150 rounded-3xl items-center justify-center"
        >
          <div className="flex gap-4">
            <label>Title : </label>
            <input
              name="title"
              className="border-1 py-1 px-2 bg-amber-400 rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <label>Price : </label>
            <input
              name="price"
              type="number"
              className="border-1 py-1 px-2  bg-amber-400 rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <label>Quantity : </label>
            <input
              name="quantity"
              type="number"
              className="border-1 py-1 px-2  bg-amber-400 rounded-md"
              min={1}
            />
          </div>
          <div className="flex gap-4">
            <label>Description : </label>
            <input
              name="description"
              className="border-1 py-1 px-2  bg-amber-400 rounded-md"
            />
          </div>
          <button className="border-1 py-1 px-2 rounded-md bg-green-400 w-30">
            Add Product
          </button>
        </form>
      </div>
      <div className="flex flex-wrap gap-6 justify-center py-5">
        {products?.map((elem) => {
          return (
            <div
              key={elem._id}
              className="p-6 rounded-xl border shadow-lg bg-amber-400 hover:shadow-2xl transition-shadow duration-300 w-64 flex flex-col items-center"
            >
              <p className="text-lg font-bold mb-2 text-black-800">
                {elem.title}
              </p>
              {productId === elem._id ? (
                <>
                  <input
                    value={updatedPrice}
                    onChange={(e) => setUpdatedprice(e.target.value)}
                  />
                  <button onClick={() => editProductId("")}>Cancel</button>
                  <button onClick={() => handleEditProduct(elem._id)}>
                    Update
                  </button>
                </>
              ) : (
                <p className="text-black-700 font-semibold mb-2">
                  {elem.price}
                </p>
              )}
              <div className="flex flex-wrap">
                <button
                  className="bg-blue-500 rounded-md mx-3 border-2"
                  onClick={() => editProductId(elem._id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 rounded-md border-2"
                  onClick={() => handleDeleteProduct(elem._id)}
                >
                  Delete
                </button>
              </div>
              <button
                onClick={() => {
                  setCount((prev) => prev + 1);
                }}
                className="py-1 px-2 border-1 rounded-md"
              >
                ++
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ProfilePage };
