# -*- encoding: utf8 -*-
"""
Фаил для настроек
"""

api_key = "any_beautiful_key"
api_host = "https://api.smartos.ru/api/v1/data/number"

redis_host = dict(
    host = "127.0.0.1",
    db = 1,
    socket_timeout = 10)

ocr_path_model = "./data/ocrnn/ocr_tf_models"

device_index = 0
cascade_model_path = "./data/haarcascade/haarcascade_rumber.xml"
work_window_cap = [200,450, 330,870]
path_sample = "./data/sample/"