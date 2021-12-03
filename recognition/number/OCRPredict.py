import os
import numpy as np
import matplotlib.pyplot as plt

from pathlib import Path
from collections import Counter

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers

img_width = 150
img_height = 30

def encode_single_sample(img_path):
    img = tf.io.read_file(img_path)
    img = tf.io.decode_png(img, channels=1)
    img = tf.image.convert_image_dtype(img, tf.float32)
    img = tf.image.resize(img, [img_height, img_width])
    img = tf.transpose(img, perm=[1, 0, 2])
    return img


characters = {'9', '7', '4', '3', '8', '5', '6', '0', '2', '1'}
char_to_num = layers.StringLookup(
    vocabulary=list(characters), mask_token=None
)

num_to_char = layers.StringLookup(
    vocabulary=char_to_num.get_vocabulary(), mask_token=None, invert=True
)

def decode_batch_predictions(pred):
    input_len = np.ones(pred.shape[0]) * pred.shape[1]
    # Use greedy search. For complex tasks, you can use beam search
    results = keras.backend.ctc_decode(pred, input_length=input_len, greedy=True)[0][0][
        :, :8
    ]
    # Iterate over the results and get back the text
    output_text = []
    for res in results:
        res = tf.strings.reduce_join(num_to_char(res)).numpy().decode("utf-8")
        output_text.append(res)
    return output_text

prediction_model = keras.models.load_model("../ocr/ocr_tf_models")
prediction_model = keras.models.Model(
    prediction_model.get_layer(name="image").input, prediction_model.get_layer(name="dense2").output
)

prediction_model.load_weights("../ocr/model_ocr.45.h5")
prediction_model.summary()

img = encode_single_sample("../mnast/data/e53.png")
img = np.expand_dims(img, 0)

import json
import requests

preds = prediction_model.predict(img)
pred_texts = decode_batch_predictions(preds)
for i in range(len(pred_texts)):
    title = f"Prediction: {pred_texts[i]}"
    print(title)
    #
    # api_key = 'ключ api'
    # data = {'number':pred_texts[i].replace('[UNK]', "*")}
    # data_json = json.dumps(data)
    # payload = {'json_payload': data_json, 'apikey': api_key}
    # r = requests.post('https://api.smartos.ru/api/v1/data/number', json=data)
    # print(r.status_code)