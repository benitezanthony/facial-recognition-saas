import numpy as np
import urllib
import json
import cv2
import os
# via the settings we can get the media root
from django.conf import settings

execution_path = settings.MEDIA_ROOT
# path to face detector file, join settings.base directory
face_detector = os.path.join(
    settings.BASE_DIR, "haarcascade_frontalface_default.xml")


def detect_faces(image_path=None, url=None):
    default = {"safely_executed": False}
    if image_path:
        # join media folder with image path
        true_image_path = os.path.join(
            execution_path, image_path.split('/media/')[1])
        image_to_read = read_image(path=true_image_path)
    elif url:
        image_to_read = read_image(url=url)
    else:
        default["error_value"] = "There is no image provided"
        return default
    image_to_read = cv2.cvtColor(image_to_read, cv2.COLOR_BGR2GRAY)
    detector_value = cv2.CascadeClassifier(face_detector)
    values = detector_value.detectMultiScale(image_to_read,
                                             scaleFactor=1.3,
                                             minNeighbors=5,
                                             minSize=(10, 10),
                                             flags=cv2.CASCADE_SCALE_IMAGE)
    values = [(int(a), int(b), int(a + c), int(b + d))
              for (a, b, c, d) in values]
    default.update({"number_of_faces": len(values),
                    "faces": values,
                    "safely_executed": True})
    # returning the dictionary
    return default


# path is passed via serializer
def read_image(path=None, stream=None, url=None):
    if path is not None:
        image = cv2.imread(path)
    else:
        if url is not None:
            response = urllib.request.urlopen(url)
            data_temp = response.read()
        elif stream is not None:
            data_temp = stream.read()
        image = np.asarray(bytearray(data_temp), dtype="uint8")
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    return image
