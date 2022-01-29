import { createContext, useContext, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const InvContext = createContext();

export const useInv = () => useContext(InvContext);

export default function InvContextProvider({ children }) {
  const [pickup, setPickup] = useState([]); //Estado para los items que seran retirados
  const [pickups, setPickups] = useState([]); //Estado para todos los items ya retirados.
  const [workers, setWorkers] = useState([]); //Estado para los trabajadores
  const [items, setItems] = useState([]); //estado para los items del inventario

  const newPickup = (newPickup) => setPickup(newPickup);
  const newPickups = (newPickups) => setPickups(newPickups);
  const newWorkers = (workers) => setWorkers(workers);

  const newItems = (items) => setItems(items);

  const fetchWorkers = async () => {
    try {
      const { data, error } = await supabase.from('USUARIOS').select();

      if (error) throw new Error(error);

      newWorkers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchItems = async () => {
    try {
      const { data, error } = await supabase.from('MATERIALES').select();

      if (error) throw new Error(error);

      newItems(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPickups = async () => {
    try {
      const { data, error } = await supabase.from('RETIRO').select();

      if (error) throw new Error(error);

      newPickups(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InvContext.Provider
      value={{
        pickup,
        newPickup,
        pickups,
        newPickups,
        workers,
        newWorkers,
        fetchWorkers,
        items,
        newItems,
        fetchItems,
        fetchPickups,
      }}
    >
      {children}
    </InvContext.Provider>
  );
}
