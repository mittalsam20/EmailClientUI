import { useState, useEffect } from "react";
import "./withLoader.css";

const withLoader = (WrappedComponent) => {
  const WithLoader = ({ isLoading, ...props }) => {
    const [innerLoading, setInnerLoading] = useState(true);
    useEffect(() => {
      setInnerLoading(isLoading);
    }, [isLoading]);

    if (innerLoading) {
      return <div className="componentLoader">{"Loading..."}</div>;
    }
    return <WrappedComponent {...props} />;
  };

  return WithLoader;
};

export default withLoader;
