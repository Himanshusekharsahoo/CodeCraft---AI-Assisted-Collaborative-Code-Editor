export const sendVerificationEmail = async (email, code) => {
  // Validate input parameters
  if (!email || !code) {
    return { success: false, message: "Email and verification code are required." };
  }

  try {
    // Set a timeout for the fetch request (e.g., 10 seconds)
    const timeout = 10000; // 10 seconds
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Make the API request
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
      signal: controller.signal, // Attach the AbortController signal
    });

    // Clear the timeout
    clearTimeout(timeoutId);

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.message || "Failed to send verification email." };
    }

    // Parse the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending verification email:", error);

    // Handle specific errors
    let errorMessage = "An error occurred while sending the verification email.";
    if (error.name === "AbortError") {
      errorMessage = "Request timed out. Please try again.";
    } else if (error.message) {
      errorMessage = error.message;
    }

    return { success: false, message: errorMessage };
  }
};