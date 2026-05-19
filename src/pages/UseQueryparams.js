import { useNavigate, useSearchParams } from "react-router-dom";

export function useQueryParams() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function getParam(key, defaultValue) {
    return searchParams.get(key) || defaultValue;
  }

  function getNumber(key, defaultValue = 1) {
    const value = Number(searchParams.get(key));
    return isNaN(value) ? defaultValue : value;
  }

  function getArray(key) {
    return searchParams.getAll(key);
  }

  function setParams(newParams) {
    const params = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, value]) => {
      params.delete(key);
      if (
        value === undefined ||
        value === "" ||
        value === null ||
        (Array.isArray(value) && value.length === 0)
      ) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    });
    navigate(`/?${params.toString()}`);
  }

  return {
    getParam,
    getNumber,
    getArray,
    setParams,
  };
}
