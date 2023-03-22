import axios from "axios";
import { useEffect, useState } from "react";
import { LocalStorageAPI } from "../utils/LocalStorageAPI";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useAxiosPrivate = () => {
  const { logoutUser } = useAuth();
  const axiosApi = useAxios();

  const baseURL = process.env.REACT_APP_SERVER_HOST_URL;
  const tokens = LocalStorageAPI.getLocalStorageTokens();

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokens?.access}`,
    },
  });

  // useEffect(() => {
  axiosInstance.interceptors.request.use(
    (config) => {
      console.log("request interceptor");
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${tokens?.access}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const prevConfig = error?.config;
      if (error.response.status === 401 && !prevConfig?.sent) {
        try {
          const response = await axiosApi.post("auth/jwt/refresh/", {
            refresh: tokens?.refresh,
          });

          const accessToken = response.data.access;
          LocalStorageAPI.setLocalStorageTokens({
            access: accessToken,
            refresh: tokens?.refresh,
          });

          prevConfig.headers["Authorization"] = `Bearer ${accessToken}`;

          return axiosInstance(prevConfig);
        } catch (error) {
          logoutUser();
          return Promise.reject(error);
        }
      }

      return Promise.reject(error);
    }
  );

  //   return () => {
  //     axiosInstance.interceptors.request.eject(requestInterceptor);
  //     axiosInstance.interceptors.response.eject(responseInterceptor);
  //   };
  // }, []);

  return axiosInstance;
};

export default useAxiosPrivate;
