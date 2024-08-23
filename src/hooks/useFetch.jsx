import { useEffect, useState } from "react";

const DEFAULT_HEADERS = {
  accept: "application/json",
  Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
};

export default function useFetch({ url = "", method = "GET", headers = {} }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_API_HOST}${url}`, {
      method,
      headers: {
        ...DEFAULT_HEADERS,
        ...headers,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        setData(data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, method, JSON.stringify(headers)]);

  return { isLoading, data };
}

// Chú ý: header vì sao phải là JSON.stringify(headers)

/*
Trong hook useEffect, mảng phụ thuộc (dependency array) quyết định khi nào effect sẽ chạy lại. Nếu bạn bao gồm một đối tượng (như headers) trực tiếp trong mảng phụ thuộc, nó có thể gây ra một vòng lặp vô tận. Điều này là do trong JavaScript, các đối tượng được so sánh dựa trên tham chiếu, không phải giá trị. Vì vậy, ngay cả khi nội dung của đối tượng headers không thay đổi, nó vẫn sẽ được coi là một đối tượng mới mỗi khi component được render lại.

Để tránh điều này, bạn có thể sử dụng JSON.stringify(headers), biến đối tượng thành một chuỗi. Điều này cho phép React so sánh giá trị đã được chuyển thành chuỗi, giá trị này sẽ giữ nguyên trừ khi nội dung của đối tượng headers thực sự thay đổi. Cách này giúp ngăn vòng lặp vô tận bằng cách đảm bảo rằng hook useEffect chỉ chạy lại khi headers thực sự thay đổi.
*/
