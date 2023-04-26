import { useState, useEffect } from "react";
import axios from "axios";

const fetchData = async ({ url, header, updateState }) => {
  try {
    const response = await axios.get(url, header);
    updateState({ updatedState: { data: response.data, isLoading: false } });
  } catch (error) {
    console.log(error);
    updateState({ updatedState: { error, isLoading: false } });
  }
};

const initialState = {
  data: [],
  error: null,
  isLoading: true,
};

const withAxios =
  ({ getUrl, header = {} }) =>
  (WrappedComponent) => {
    const WithAxios = ({ ...props }) => {
      const [axiosState, setAxiosState] = useState(initialState);
      const { data, error, isLoading } = axiosState;
      const url = getUrl(props);

      const updateState = ({ updatedState }) => {
        setAxiosState((prevState) => ({ ...prevState, ...updatedState }));
      };

      useEffect(() => {
        fetchData({ url, header, updateState });
      }, [url]);

      return (
        <WrappedComponent
          data={data}
          error={error}
          isLoading={isLoading}
          {...props}
        />
      );
    };

    return WithAxios;
  };

export default withAxios;
