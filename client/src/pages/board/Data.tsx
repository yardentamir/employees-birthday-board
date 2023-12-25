export interface IPerson {
  name: string;
  birthDate: Date;
  email: string;
}

import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import client from "../../services/client";

const useFetchEmployeesWithBirthdays = () => {
  const [data, setData] = useState<IPerson[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<IPerson[]> = await client.get(
          `employee/employeesWithBirthdays`
        );
        setData(response.data);
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong. Please try again");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetchEmployeesWithBirthdays;
