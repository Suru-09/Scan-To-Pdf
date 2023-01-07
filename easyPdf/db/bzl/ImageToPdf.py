import os

from PIL import Image


class ImageToPdf:
    @staticmethod
    def image_to_pdf_list(path_list, upload_to, pdf_name):
        image_list = []
        im_1 = Image.open(path_list[0]).resize((576, 768))
        image_1 = im_1.convert('RGB')
        for path in path_list:
            if path != path_list[0]:
                image = Image.open(path).resize((576, 768))
                image_list.append(image.convert('RGB'))
        safe_path = os.path.abspath(os.path.expanduser(upload_to + f'/{pdf_name}.pdf'))
        image_1.save(safe_path, save_all=True, append_images=image_list)
        return safe_path
