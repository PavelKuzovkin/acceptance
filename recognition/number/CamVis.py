import cv2

# WORK_WINDOW = [10,640, 10,820]
WORK_WINDOW = [200,450, 330,870]

def find_number(num_frame, bframe):
    from cv2 import CascadeClassifier
    classifierb = CascadeClassifier('./haarcascade_russian_plate_number.xml')
    img_gray = cv2.cvtColor(bframe, cv2.COLOR_BGR2GRAY)[WORK_WINDOW[0]:WORK_WINDOW[1], WORK_WINDOW[2]:WORK_WINDOW[3]]
    cv2.imshow("gray", img_gray)
    bboxes = classifierb.detectMultiScale(img_gray, scaleFactor=1.3, minNeighbors=3, minSize=(110, 25))
    # print(bboxes)

    if bboxes != [] and bboxes != ():
        for box in bboxes:
            x, y, width, height = box
            x1, y1 = (x + WORK_WINDOW[2] + 1, y + WORK_WINDOW[0] + 1)
            x2, y2 = x1 + width, y1 + height
            # cv2.rectangle(bframe, (x1, y1), (x2, y2), (255, 255, 0), 1)
            crop_img = bframe[y1:y1 + height, x1:x1 + width]
            cv2.imshow("cropped", crop_img)
            cv2.imwrite('./data/e{}.png'.format(num_frame), crop_img)


cap = cv2.VideoCapture('vid4.mp4')

frame_width = int(cap.get(3))
frame_height = int(cap.get(4))


if not cap.isOpened():
    print("Cannot open camera")
    exit()


delim = 2
sensitivity = 22
height = int(1280 // delim)
width = int(1024 // delim)

num_frame = 0
while True:
    check, frame = cap.read()
    if check:
        num_frame += 1
        find_number(num_frame, frame)
        cv2.imshow('video', frame)
    if cv2.waitKey(1) & 0xFF == ord('s'):
        cv2.waitKey(0)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
cap.release()
cv2.destroyAllWindows()