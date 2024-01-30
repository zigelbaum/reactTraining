import { useState, useEffect } from "react";
import Product from "../types/Product";
// import products from '../data/products.json';

const useFetch = (): [Product[], boolean] => {

    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://localhost:5001/products"); // Update the URL accordingly
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const productsData = await response.json();
                const mappedData = productsData.map((product: Product) => ({
                    id: product.id,
                    code: product.code,
                    name: product.name,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    category: product.category,
                    amount: product.amount,
                }));

                setData(mappedData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                // setIsLoading(true);
            }
        };

        fetchData();
    }, []);


    return [data, isLoading];
};

export default useFetch;