export const getInfo = async () => {
    const URL = "http://161.35.143.238:8000/gadjemian";
    try {
      const response = await fetch(URL, {
        headers: {
          "bypass-tunnel-reminder": "true",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log("Error getting info");
        return [];
      }
    } catch (error) {
      console.error(error);
    }
  };

  export const getInfoById = async (id: string) => {
    const URL = `http://161.35.143.238:8000/gadjemian/${id}`;
    try {
      const response = await fetch(URL, {
        headers: {
          "bypass-tunnel-reminder": "true",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.log("Error getting info");
        return [];
      }
    } catch (error) {
      console.error(error);
    }
  };

