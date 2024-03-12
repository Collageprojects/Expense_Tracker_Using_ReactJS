import { useState } from "react";

export function useFilter(dataList, callback) {
  const [query, SetQuery] = useState("");
  const filteredData = dataList.filter((data) =>
    callback(data).toLowerCase().includes(query.toLowerCase())
  );

  return [filteredData, SetQuery];
}
