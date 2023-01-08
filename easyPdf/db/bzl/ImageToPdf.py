import os

from PIL import Image


class ImageToPdf:

    @staticmethod
    def open_and_convert_image(image_path):
        image = Image.open(image_path).resize((768, 1024))
        image = image.convert("L")
        return image

    @staticmethod
    def image_to_pdf_list(path_list, upload_to, pdf_name):
        image_list = []
        image_1 = ImageToPdf.open_and_convert_image(path_list[0])
        for path in path_list:
            if path != path_list[0]:
                image = ImageToPdf.open_and_convert_image(path)
                image_list.append(image)
        safe_path = os.path.abspath(os.path.expanduser(upload_to + f'/{pdf_name}.pdf'))
        image_1.save(safe_path, save_all=True, append_images=image_list)
        return safe_path
