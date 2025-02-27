import { ref } from 'vue';
import type {Product} from '../interfaces/interfaces';



export const useProducts = () => {

  const error = ref<string | null>(null);
  const loading = ref<boolean>(false);
  const products = ref<Product[]>([]);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchProducts = async (): Promise<void> => {
    loading.value = true;
    try {
      const response = await fetch(`${API_URL}/products`
      );
      if (!response.ok) {
        throw new Error('No data available');
      }
      const data: Product[] = await response.json();
      products.value = data;
      console.log("products fetched", products.value);
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      loading.value = false;
    }
  }
return { error, loading, products, fetchProducts };

}


