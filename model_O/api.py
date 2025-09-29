
# To run this API, use: uvicorn api:app --reload
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import numpy as np
from io import BytesIO
from PIL import Image
import tensorflow as tf

app = FastAPI()
# the reason we put this origins is bcz we get confusion btn backend and frontend in generating a clear prediction and screening of the image
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



MODEL_PATH = "C:/Users/USER/Desktop/Projects_git/car_reco/saved models/22.keras"
model = tf.keras.models.load_model(MODEL_PATH)

class_names = [
    'Audi',
    'Hyundai Creta',
    'Mahindra Scorpio',
    'Rolls Royce',
    'Swift',
    'Tata Safari',
    'Toyota Innova'
]

@app.get("/ping")
async def ping():
    return "Hello, I am alive"

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image


def read_file_as_image(data) -> np.ndarray:
    image = Image.open(BytesIO(data)).convert("RGB")
    image = image.resize((224, 224))  # 👈 match your model input size
    return np.array(image)

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image = read_file_as_image(await file.read())
    img_batch = np.expand_dims(image, 0)
    
    predictions = model.predict(img_batch)

    predicted_class = class_names[np.argmax(predictions[0])]
    confidence = np.max(predictions[0])
    return {
        'class': predicted_class,
        'confidence': float(confidence)
    }

