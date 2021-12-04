# -*- encoding: utf8 -*-
__author__ = 'maxdob'
__date__ = '03.12.21'
__time__ = '14:43'
__version__ = '1.0'

import logging
logging.basicConfig(level=logging.INFO)
log = logging.getLogger('Rumber.Ocr')

import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from threading import Thread
from urpc import uRPC, uRPCClientFabric
from app.config import ocr_path_model, redis_host

prediction_model = None


def load_model():
    global prediction_model
    prediction_model = keras.models.load_model(ocr_path_model)
    prediction_model = keras.models.Model(
        prediction_model.get_layer(name="image").input, prediction_model.get_layer(name="dense2").output
    )
    log.info('Model is load!')


class Sampler:
    characters = {'9', '7', '4', '3', '8', '5', '6', '0', '2', '1'}
    char_to_num = layers.StringLookup(
        vocabulary=list(characters), mask_token=None
    )

    num_to_char = layers.StringLookup(
        vocabulary=char_to_num.get_vocabulary(), mask_token=None, invert=True
    )

    _img_width = 200
    _img_height = 50

    def __init__(self, path):
        self._path = path

    @classmethod
    def encode_single_sample(cls, img_path):
        img = tf.io.read_file(img_path)
        img = tf.io.decode_png(img, channels=1)
        img = tf.image.convert_image_dtype(img, tf.float32)
        img = tf.image.resize(img, [cls._img_height, cls._img_width])
        img = tf.transpose(img, perm=[1, 0, 2])
        return img

    @classmethod
    def decode_batch_predictions(cls, preds):
        input_len = np.ones(preds.shape[0]) * preds.shape[1]
        results = keras.backend.ctc_decode(preds, input_length=input_len, greedy=True)[0][0][
                  :, :8
                  ]
        output_text = []
        for res in results:
            res = tf.strings.reduce_join(cls.num_to_char(res)).numpy().decode("utf-8")
            output_text.append(res)
        return output_text

    def get_number(self):
        global prediction_model

        sample_img = self.encode_single_sample(self._path)
        sample_img = np.expand_dims(sample_img, 0)
        preds = prediction_model.predict(sample_img)
        return self.decode_batch_predictions(preds)


class OCR(Thread):
    """
    Класс распознавания номера
    """
    rpc = uRPCClientFabric(redis_host)

    def __init__(self, sample):
        super(OCR, self).__init__(daemon=True)
        self._data = sample

    def run(self):
        self._processing()

    def _processing(self):
        res = self.rpc.tx(number=Sampler(self._data).get_number())
        log.debug('Trying to send the number to the next : %s!', res)


def run_ocr(sample):
    runner = OCR(sample)
    runner.start()
    return runner.is_alive()


class OcrServer(uRPC):
    """
    Сервер обмена сообщениями
    """
    def worker(self, params):
        if 'sample' in params:
            return {'ok': 200 if run_ocr(params['sample']) else 418}
        return {'error': 'Нет нужных параметров!'}


if __name__ == '__main__':
    load_model()
    log.info('Start loop rx thread.')
    u = OcrServer()
    u.main_loop()
