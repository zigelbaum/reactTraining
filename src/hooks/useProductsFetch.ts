import { useState, useEffect } from "react";
import Product from "../types/Product";
import products from '../data/products.json';

const useFetch = (): [Product[], boolean] => {

    const [data, setData] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const loadDataWithDelay = async () => {
            setTimeout(() => {
                const data = products.map((product) => ({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                    category: product.category,
                }));
                setData(data);
                setIsLoading(false);
            }, 1000);
        };
        loadDataWithDelay();
    }, [])

    return [data, isLoading];
};

export default useFetch;