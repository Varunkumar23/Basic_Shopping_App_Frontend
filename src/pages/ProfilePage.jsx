import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useState } from "react";

const ProfilePage = () => {
  const [products, setProducts] = useState();

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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div>
        <form
          onSubmit={handleSubmit}
          className="mx-auto my-4 flex flex-col gap-5 p-6 bg-blue-200 max-w-150 rounded-3xl"
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
          <button className="border-1 py-1 px-2 rounded-md">Add Product</button>
        </form>
      </div>
      <div className="flex flex-wrap gap-6 justify-center py-5">
        {products?.map((elem) => {
          return (
            <div
              key={elem._id}
              className="p-6 rounded-xl border shadow-lg bg-amber-400 hover:shadow-2xl transition-shadow duration-300 w-64 flex flex-col items-center"
            >
              <p className="text-lg font-semibold mb-2 text-gray-800">
                {elem.title}
              </p>
              <p className="text-amber-700 font-bold mb-2">{elem.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { ProfilePage };
