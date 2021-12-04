# -*- encoding: utf8 -*-
__author__ = 'maxdob'
__date__ = '03.12.21'
__time__ = '14:19'
__version__ = '1.0'

import sys
import threading
import logging

logging.basicConfig(level=logging.DEBUG)
log = logging.getLogger('Rumber.Vid')
from urpc import uRPC, uRPCClientFabric
from datetime import datetime
import cv2
from cv2 import CascadeClassifier

from app.config import work_window_cap
import app.config as config

rpc = uRPCClientFabric(config.redis_host)

thread_detect = None
video_c = None
classifier = CascadeClassifier(config.cascade_model_path)


class VideoCap:
    """
    Класс камеры
    """
    def __init__(self):
        self.detect = True
        self.video_cap = cv2.VideoCapture(config.device_index, cv2.CAP_DSHOW)
        self.frame_width = int(self.video_cap.get(3))
        self.frame_height = int(self.video_cap.get(4))

    def start(self):
        global thread_detect

        self.detect = False
        thread_detect = threading.Thread(target=self.detections, daemon=True)
        thread_detect.start()
        log.info('Start capture.')

    def stop(self):
        global thread_detect
        self.detect = True
        self.video_cap.release()
        cv2.destroyAllWindows()
        log.info('Stop capture.')
        sys.exit()

    def detections(self):
        global video_c
        if not self.video_cap.isOpened():
            self.stop()
            log.critical("Cannot open camera")
            sys.exit()

        while True:
            check, frame = self.video_cap.read()
            if check:
                self.find_number(frame)
                cv2.imshow('video', frame)
            if cv2.waitKey(1) & self.detect:
                break
        self.stop()
    @staticmethod
    def find_number(bframe):
        global classifier

        frame_gray = cv2.cvtColor(bframe, cv2.COLOR_BGR2GRAY)[work_window_cap[0]:work_window_cap[1],
                     work_window_cap[2]:work_window_cap[3]]
        bboxes = classifier.detectMultiScale(frame_gray, scaleFactor=1.3, minNeighbors=3, minSize=(100, 27))

        if bboxes != [] and bboxes != ():
            for box in bboxes:
                x, y, width, height = box
                x1, y1 = (x + work_window_cap[2] + 1, y + work_window_cap[0] + 1)
                x2, y2 = x1 + width, y1 + height
                # cv2.rectangle(bframe, (x1, y1), (x2, y2), (255, 255, 0), 1)
                crop_img = bframe[y1:y2, x1:x2]
                file_sample = config.path_sample + '{}.png'.format(datetime.now().strftime('%H%M%S%f'))
                cv2.imwrite(file_sample, crop_img)
                res = rpc.ocr(sample=file_sample)
                log.info('Trying to send the number to the next : %s!', res)


def camera_command(command):
    """
    Обработка команд камеры
    """
    global video_c
    try:
        if not video_c and command == 'on':
            video_c = VideoCap()
            video_c.start()
            log.info('Start capture.')
        elif video_c and command == 'off':
            video_c.detect = True
            del video_c
            video_c = None
            log.info('Stop capture.')
        return True
    except Exception:
        return False


class VidServer(uRPC):
    """
    Сервер обмена сообщениями
    """
    def worker(self, params):
        if 'command' not in params:
            return {'error': 'Нет нужных параметров!'}

        return {'ok': 200 if camera_command(params['command']) else 418}


if __name__ == '__main__':
    u = VidServer()
    u.main_loop()
