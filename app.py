import webview
import os
import sys

def get_resource_path(relative_path):
    """ Get absolute path to resource, works for dev and for PyInstaller """
    try:
        # PyInstaller creates a temp folder and stores path in _MEIPASS
        base_path = sys._MEIPASS
    except Exception:
        base_path = os.path.abspath(".")

    return os.path.join(base_path, relative_path)

if __name__ == '__main__':
    # Load the index.html path
    html_path = get_resource_path('index.html')
    
    # Create webview window
    webview.create_window(
        title='AntiGravity占卜',
        url=html_path,
        width=1280,
        height=850,
        resizable=True,
        min_size=(1024, 768)
    )
    # Start webview
    webview.start()
