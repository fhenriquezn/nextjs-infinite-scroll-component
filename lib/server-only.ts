"server-only";

const getBaseUrl = (endpoint: string) => {
  return `${process.env.DUMMY_API_URL}/${endpoint}`;
};

const getOptions = async (method: string) => {
  return {
    method: method,
    //add more headers here
  };
};

export async function GET<T>(url: string) {
  const options = await getOptions("GET");
  const endpoint = getBaseUrl(url);
  try {
    const response = await fetch(endpoint, options);
    if (response.ok) {
      const body = await response.json();
      return body as T;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}
