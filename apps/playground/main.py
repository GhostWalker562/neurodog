from neurosity import NeurositySDK
from dotenv import load_dotenv
import os
import time
import threading
from functools import wraps


def debounce(wait):
    """Debounce decorator that allows a function to be called once and then waits
    for a specified amount of seconds before it can be called again. Subsequent calls
    within the wait period reset the timer.

    Args:
        wait (int): The amount of seconds to wait before the function can be called again.
    """

    def decorator(func):
        @wraps(func)
        def debounced(*args, **kwargs):
            def call_it():
                debounced._timer = None
                func(*args, **kwargs)

            if debounced._timer is not None:
                debounced._timer.cancel()

            debounced._timer = threading.Timer(wait, call_it)
            debounced._timer.start()

        debounced._timer = None
        return debounced

    return decorator


load_dotenv()

device_id = os.getenv("NEUROSITY_DEVICE_ID")
neurosity = NeurositySDK({"device_id": device_id})

neurosity.login(
    {"email": os.getenv("NEUROSITY_EMAIL"), "password": os.getenv("NEUROSITY_PASSWORD")}
)

info = neurosity.get_info()


last_time = 0
is_forward = False


def callback(data):
    global last_time

    # Check if the last time the function was called was more than 3 second ago
    if (time.time() - last_time) > 3:
        # Do logic here
        print(data)

    last_time = time.time()


print("Beginning")

unsubscribe = neurosity.kinesis("tongue", callback)

time.sleep(60)
unsubscribe()
print("Done with example.py")
