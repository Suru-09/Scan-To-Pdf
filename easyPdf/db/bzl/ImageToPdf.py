from PIL import Image


class ImageToPdf:
    @staticmethod
    def image_to_pdf(path_list):
        image_list = []
        for path in path_list:
            image = Image.open(path)
            image_list.append(image.convert('RGB'))
        return image_list
