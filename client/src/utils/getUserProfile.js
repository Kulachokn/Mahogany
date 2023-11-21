export const getUserProfile = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
        console.error("Access token is missing. Please login.");
        return;
      }

    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        return;
      }

    const res = await response.json();

    if (res.error) return;

    const profile = JSON.stringify(res);
    window.localStorage.setItem("user", profile);
  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
};
