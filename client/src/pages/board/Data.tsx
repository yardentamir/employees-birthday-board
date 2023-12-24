export interface IPerson {
  name: string;
  birthDate: Date;
  email: string;
}

import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import client from "../../services/client";

const useFetchEmployeesWithBirthdays = () => {
  const [data, setData] = useState<IPerson[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null | unknown>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<IPerson[]> = await client.get(
          `employee/employeesWithBirthdays`
        );
        setData(response.data);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          // Handle AxiosError, extract error details
          console.error("Axios error:", error.message);
          setError(error.message);
        } else {
          // Handle other types of errors or unknown errors
          console.error("Unknown error:", error);
          setError(error);
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

// export const data = [
//   {
//     name: "Dylan",
//     birthDate: new Date(),
//     email: "yarden@gmail.com",
//   },
//   {
//     name: "Dylan",
//     birthDate: new Date(),
//     email: "yarden@gmail.com",
//   },
//   {
//     name: "Dylan",
//     birthDate: new Date(),
//     email: "yarden@gmail.com",
//   },
//   {
//     name: "Dylan",
//     birthDate: new Date(),
//     email: "yarden@gmail.com",
//   },
//   {
//     name: "Dylan",
//     birthDate: new Date(),
//     email: "yarden@gmail.com",
//   },
// ];
