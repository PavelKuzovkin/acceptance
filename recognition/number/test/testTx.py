from urpc import uRPCClientFabric
from app.config import redis_host

rpc = uRPCClientFabric(redis_host)
print(rpc.tx(number=["59271779"]))