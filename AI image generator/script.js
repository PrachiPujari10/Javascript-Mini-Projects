const API_TOKEN = "AIzaSyAQAdTvbtaNtaNrJoSJBD2e-qTU7s2yS0A"; // Replace with your Hugging Face token

const resultImg = document.getElementById("result");
const loader = document.getElementById("loader");
const downloadBtn = document.getElementById("downloadBtn");

async function generateImage() {
  const prompt = document.getElementById("prompt").value;

  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  // Show loader
  loader.style.display = "block";
  resultImg.style.display = "none";
  downloadBtn.style.display = "none";

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: { width: 512, height: 512, num_inference_steps: 30 }
        })
      }
    );

    const blob = await response.blob();
    const imgURL = URL.createObjectURL(blob);

    resultImg.src = imgURL;
    resultImg.style.display = "block";
    downloadBtn.style.display = "block";

  } catch (error) {
    console.error(error);
    alert("Error generating image. Check console for details.");
  } finally {
    loader.style.display = "none";
  }
}

// Download generated image
function downloadImage() {
  const link = document.createElement("a");
  link.href = resultImg.src;
  link.download = "generated_image.png";
  link.click();
}
