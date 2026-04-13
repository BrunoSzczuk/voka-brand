from PIL import Image
import os
import re

# Paths
LOGO_BLACK = '/workspace/brand-identity/logos/voka-logo-black-300dpi.png'
LOGO_WHITE = '/workspace/brand-identity/logos/voka-logo-white-300dpi.png'
FOLDER_WITH_LOGO = '/workspace/pedido 12:abril/com logo'
FOLDER_320G = '/workspace/pedido 12:abril/sem logo - 320g'
OUTPUT_FOLDER = '/workspace/pedido 12:abril/com logo/output'

# Create output folder if not exists
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def is_dark_image(image_path):
    """Determine if image is dark based on average brightness"""
    img = Image.open(image_path).convert('RGB')
    # Resize for faster processing
    img_small = img.resize((50, 50))
    pixels = list(img_small.getdata())
    avg_brightness = sum(sum(pixel) for pixel in pixels) / (len(pixels) * 255 * 3)
    return avg_brightness < 0.5  # Threshold for dark images

def add_logo_to_image(image_path, logo_path, output_path, position='right_chest'):
    """Add logo to t-shirt image at chest position"""
    # Open the t-shirt image
    shirt = Image.open(image_path).convert('RGBA')
    shirt_width, shirt_height = shirt.size
    
    # Open and prepare logo
    logo = Image.open(logo_path).convert('RGBA')
    
    # Calculate logo size relative to shirt (approximately 8-10% of shirt width)
    logo_target_width = int(shirt_width * 0.12)
    logo_aspect = logo.height / logo.width
    logo_target_height = int(logo_target_width * logo_aspect)
    logo_resized = logo.resize((logo_target_width, logo_target_height), Image.Resampling.LANCZOS)
    
    # Position: right chest (viewer's left, wearer's right)
    # Typically around 25-30% from top, 15-20% from side
    if position == 'right_chest':
        # For right chest (wearer's right = viewer's left)
        x_offset = int(shirt_width * 0.18)
        y_offset = int(shirt_height * 0.28)
    else:
        x_offset = int(shirt_width * 0.65)
        y_offset = int(shirt_height * 0.28)
    
    logo_x = x_offset
    logo_y = y_offset
    
    # Create a copy to paste on
    result = shirt.copy()
    
    # Paste logo with transparency
    result.paste(logo_resized, (logo_x, logo_y), logo_resized)
    
    # Save result
    result_rgb = result.convert('RGB')
    result_rgb.save(output_path, 'JPEG', quality=95)
    print(f"✓ Processed: {os.path.basename(image_path)} -> {output_path}")

def process_folder_with_logo():
    """Process images in 'com logo' folder"""
    print("\n=== Processing 'com logo' folder ===")
    
    for filename in os.listdir(FOLDER_WITH_LOGO):
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')) and not filename.startswith('.'):
            image_path = os.path.join(FOLDER_WITH_LOGO, filename)
            
            # Determine if shirt is dark or light
            is_dark = is_dark_image(image_path)
            logo_path = LOGO_WHITE if is_dark else LOGO_BLACK
            
            output_path = os.path.join(OUTPUT_FOLDER, f"logo_{filename}")
            
            add_logo_to_image(image_path, logo_path, output_path)

def process_320g_folder():
    """Process 320g images using cleanup versions"""
    print("\n=== Processing 'sem logo - 320g' folder ===")
    
    output_320g = os.path.join(FOLDER_320G, 'output_premium')
    os.makedirs(output_320g, exist_ok=True)
    
    # Find all cleanup images
    cleanup_images = [f for f in os.listdir(FOLDER_320G) if '_cleanup' in f.lower()]
    
    for filename in cleanup_images:
        if filename.lower().endswith(('.jpg', '.jpeg', '.png')):
            image_path = os.path.join(FOLDER_320G, filename)
            
            # Determine if shirt is dark or light
            is_dark = is_dark_image(image_path)
            logo_path = LOGO_WHITE if is_dark else LOGO_BLACK
            
            # Create premium version name
            base_name = filename.replace('_cleanup', '').replace('.jpg', '').replace('.jpeg', '')
            output_path = os.path.join(output_320g, f"premium_{base_name}.jpg")
            
            add_logo_to_image(image_path, logo_path, output_path)

if __name__ == '__main__':
    process_folder_with_logo()
    process_320g_folder()
    print("\n✅ All images processed successfully!")
