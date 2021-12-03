from urpc import uRPCClientFabric
from app.config import redis_host

rpc = uRPCClientFabric(redis_host)
print(rpc.ocr(sample="C:\\Users\\ISS\\Desktop\\Hakaton\\ssdresnet\\mnast\\data\\new\\62430741.png"))