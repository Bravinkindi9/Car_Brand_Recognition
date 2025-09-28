from fastapi import FastAPI, UploadFile, File
import uvicorn
import tensorflow as tf
import numpy as np
from PIL import Image
import io

# 1. Load the trained model
# Replace 'path/to/your/model' with the actual path to your exported model file.
model = tf.saved_model.load("C:/Users/USER/Desktop/Projects_git/model_v1")

# Get the list of classes your model can predict.
# These must be in the same order as they were during training.
class_names = [
    'Audi',
    'Hyundai Creta',
    'Mahindra Scorpio',
    'Rolls Royce',
    'Swift',
    'Tata Safari',
    'Toyota Innova'
]

app = FastAPI()

def preprocess_image(image):
    """
    Preprocesses the image to be compatible with your model.
    """
    img = Image.open(io.BytesIO(image)).resize((224, 224)).convert('RGB')
    img_array = np.array(img) / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.get("/")
def home():
    """
    Defines the home page.
    """
    return {"message": "Welcome to the Car Brand Recognition API!"}

@app.post("/predict")
async def predict_car_brand(file: UploadFile = File(...)):
    """
    Endpoint to predict the car brand from an uploaded image.
    """
    # Read the image file content
    image_content = await file.read()

    # Preprocess the image
    processed_image = preprocess_image(image_content)

    # Make a prediction
    predictions = model(tf.constant(processed_image, dtype=tf.float32))
    predicted_class_index = np.argmax(predictions)
    predicted_class_name = class_names[predicted_class_index]
    confidence = float(np.max(predictions))

    return {
        "prediction": predicted_class_name,
        "confidence": confidence,
        "message": f"This car is a {predicted_class_name} with {confidence:.2f} confidence."
    }

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)