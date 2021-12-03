# -*- encoding: utf8 -*-
__author__ = 'maxdob'
__date__ = '03.12.21'
__time__ = '11:46'
__version__ = '1.0'

import logging

import requests
from urpc import uRPC

from app.config import api_key, api_host

logging.basicConfig(level=logging.INFO)
log = logging.getLogger('Rumber.Tx')


def shaping(data):
    return {'number': data.replace('[UNK]', '*')}


def sender(data):
    for el in data:
        try:
            payload = shaping(el)
            payload.update({'apikey': api_key})

            resp = requests.post(api_host, json=payload)
        except Exception as e:
            log.warning('No connect host: %s!', e)
        else:
            if resp.status_code != 200:
                log.warning('Data not sent. : %s..', resp.status_code)
            else:
                log.debug('OK: %s..', resp.status_code)
            return resp.status_code


class TxServer(uRPC):

    def worker(self, params):
        if 'number' not in params:
            return {'error': 'Нет нужных параметров!'}
        return {'ok': sender(params['number'])}


if __name__ == '__main__':
    u = TxServer()
    u.main_loop()
