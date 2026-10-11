# from moviepy.editor import VideoFileClip

# def crop_video(input_path, output_path, x1, y1, x2, y2):
#     """
#     裁剪视频的分辨率
#     :param input_path: 输入视频的路径
#     :param output_path: 输出视频的路径
#     :param x1, y1: 裁剪矩形的左上角坐标
#     :param x2, y2: 裁剪矩形的右下角坐标
#     """
#     # 加载视频
#     video = VideoFileClip(input_path)

#     # 裁剪视频
#     cropped_video = video.crop(x1=x1, y1=y1, x2=x2, y2=y2)

#     # 写入文件
#     cropped_video.write_videofile(output_path, codec="libx264", audio_codec="aac")

# # 使用示例
# crop_video("video.mp4", "video_cut.mp4", 0, 120, 1000, 650)

# from moviepy.editor import VideoFileClip

# def crop_video(input_path, output_path, x1, y1, x2, y2):
#     """
#     裁剪视频的分辨率
#     :param input_path: 输入视频的路径
#     :param output_path: 输出视频的路径
#     :param x1, y1: 裁剪矩形的左上角坐标
#     :param x2, y2: 裁剪矩形的右下角坐标
#     """
#     # 加载视频
#     video = VideoFileClip(input_path)

#     # 获取原始视频的帧率
#     original_fps = video.fps

#     # 裁剪视频
#     cropped_video = video.crop(x1=x1, y1=y1, x2=x2, y2=y2)

#     # 写入文件，使用原始视频的帧率
#     cropped_video.write_videofile(output_path, codec="libx264", audio_codec="aac", fps=30.08)

# # 使用示例
# crop_video("video_original.mp4", "video.mp4", 0, 120, 1000, 650)

import cv2

def crop_video_opencv(input_path, output_path, x, y, width, height):
    cap = cv2.VideoCapture(input_path)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    # fourcc = cv2.VideoWriter_fourcc(*'X264')
    


    out = cv2.VideoWriter(output_path, fourcc, cap.get(cv2.CAP_PROP_FPS), (width, height))

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        crop_frame = frame[y:y+height, x:x+width]
        out.write(crop_frame)

    cap.release()
    out.release()

# 使用示例
crop_video_opencv("video_original.mp4", "video.mp4", 0, 120, 1000, 530)

print("process finished")


