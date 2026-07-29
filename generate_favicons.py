import os
import sys

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow library...")
    os.system(f"{sys.executable} -m pip install Pillow")
    from PIL import Image

logo_path = os.path.join(os.path.dirname(__file__), 'frontend', 'public', 'logo.webp')
public_dir = os.path.join(os.path.dirname(__file__), 'frontend', 'public')

print(f"🔍 Reading logo: {logo_path}")
img = Image.open(logo_path)
width, height = img.size
print(f"Original logo dimensions: {width}x{height}, mode: {img.mode}")

if img.mode not in ("RGB", "RGBA"):
    img = img.convert("RGBA")

# Make square box by padding with background color
if width != height:
    max_dim = max(width, height)
    bg_color = img.getpixel((5, 5))
    
    square_img = Image.new("RGBA" if img.mode == "RGBA" else "RGB", (max_dim, max_dim), bg_color)
    offset = ((max_dim - width) // 2, (max_dim - height) // 2)
    square_img.paste(img, offset)
    base_sq = square_img
else:
    base_sq = img

sizes = {
    "favicon-16x16.png": (16, 16),
    "favicon-32x32.png": (32, 32),
    "apple-touch-icon.png": (180, 180),
    "android-chrome-192x192.png": (192, 192),
    "android-chrome-512x512.png": (512, 512),
}

for name, size in sizes.items():
    resized = base_sq.resize(size, Image.Resampling.LANCZOS)
    out_path = os.path.join(public_dir, name)
    resized.save(out_path, format="PNG", optimize=True)
    print(f"✅ Generated: {name} ({size[0]}x{size[1]})")

ico_path = os.path.join(public_dir, "favicon.ico")
ico_img = base_sq.resize((64, 64), Image.Resampling.LANCZOS)
ico_img.save(ico_path, format="ICO", sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
print(f"✅ Generated: favicon.ico")

print("\n🎉 All Favicon and Mobile Shortcut icons generated successfully!")
