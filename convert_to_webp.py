import os
import sys

try:
    from PIL import Image
except ImportError:
    print("Installing Pillow library for WebP conversion...")
    os.system(f"{sys.executable} -m pip install Pillow")
    from PIL import Image

public_dir = os.path.join(os.path.dirname(__file__), 'frontend', 'public')
src_dir = os.path.join(os.path.dirname(__file__), 'frontend')

print(f"🔍 Processing images in: {public_dir}\n")

converted_files = {}
total_old_size = 0
total_new_size = 0

# 1. Convert all PNG, JPG, JPEG images in public directory to WebP
for filename in os.listdir(public_dir):
    ext = os.path.splitext(filename)[1].lower()
    if ext in ['.png', '.jpg', '.jpeg']:
        old_path = os.path.join(public_dir, filename)
        base_name = os.path.splitext(filename)[0]
        new_filename = base_name + '.webp'
        new_path = os.path.join(public_dir, new_filename)

        try:
            with Image.open(old_path) as img:
                if img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info):
                    img = img.convert("RGBA")
                else:
                    img = img.convert("RGB")
                img.save(new_path, "WEBP", quality=82, optimize=True)
            
            old_size = os.path.getsize(old_path)
            new_size = os.path.getsize(new_path)
            total_old_size += old_size
            total_new_size += new_size
            
            saved_pct = (1 - (new_size / old_size)) * 100 if old_size > 0 else 0
            print(f"✅ Converted: {filename:<35} ({old_size/1024:.1f} KB -> {new_size/1024:.1f} KB | -{saved_pct:.1f}%)")
            
            converted_files[filename] = new_filename
            # Remove old image
            os.remove(old_path)
        except Exception as e:
            print(f"❌ Error converting {filename}: {e}")

print(f"\n🎉 Total size reduced from {total_old_size/(1024*1024):.2f} MB to {total_new_size/(1024*1024):.2f} MB!")

# 2. Replace image file extensions in code files
print("\n📝 Updating code references to .webp...")
updated_count = 0

for root, dirs, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.jsx', '.js', '.html', '.css', '.json')):
            file_path = os.path.join(root, f)
            try:
                with open(file_path, 'r', encoding='utf-8') as file:
                    content = file.read()
                
                new_content = content
                for old_img, new_img in converted_files.items():
                    new_content = new_content.replace(old_img, new_img)
                
                if new_content != content:
                    with open(file_path, 'w', encoding='utf-8') as file:
                        file.write(new_content)
                    print(f"  ➜ Updated references in: {os.path.basename(file_path)}")
                    updated_count += 1
            except Exception as e:
                print(f"❌ Error updating {f}: {e}")

print(f"\n✨ Done! Updated {updated_count} files. All images are now in WebP format.")
