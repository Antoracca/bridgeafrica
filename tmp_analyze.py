from PIL import Image

img = Image.open(r"C:\Users\HP\BRIGDE\bridgeafrica\public\hand-iphone.png").convert("RGBA")
width, height = img.size

# We want to find the bounding box of the transparent area inside the phone.
# The image itself has transparent background, so we must be careful.
# The screen is fully transparent. The phone bezel is opaque.
# Let's find the center of the phone. Looking at the image, x=300 (out of 1000), y=300 is probably inside the screen.
# We'll just scan all pixels, find large blocks of transparency that are bounded by opaque pixels.
# Or simpler: scan rows/cols to find the screen box. Let's just output some stats.
transparent_pixels = []
for y in range(height):
    for x in range(width):
        r,g,b,a = img.getpixel((x,y))
        if a < 10: # fully transparent
            transparent_pixels.append((x,y))

# The background is also transparent, so transparent_pixels contains the outside AND the inside.
# We can find the screen by scanning from center of the phone. Let's guess the screen center is X=30% W, Y=40% H.
cx = int(width * 0.3)
cy = int(height * 0.4)

# find bounds expanding from cx, cy assuming it's inside the screen hole
left = cx
while left > 0 and img.getpixel((left, cy))[3] < 10:
    left -= 1

right = cx
while right < width - 1 and img.getpixel((right, cy))[3] < 10:
    right += 1

top = cy
while top > 0 and img.getpixel((cx, top))[3] < 10:
    top -= 1

bottom = cy
while bottom < height - 1 and img.getpixel((cx, bottom))[3] < 10:
    bottom += 1

print(f"Image Size: {width}x{height}")
print(f"Screen bounds from guess center ({cx}, {cy}):")
print(f"Left: {left} ({left/width*100:.2f}%)")
print(f"Right: {right} ({right/width*100:.2f}%)")
print(f"Top: {top} ({top/height*100:.2f}%)")
print(f"Bottom: {bottom} ({bottom/height*100:.2f}%)")
print(f"Screen Width: {right-left} ({ (right-left)/width*100:.2f}%)")
print(f"Screen Height: {bottom-top} ({ (bottom-top)/height*100:.2f}%)")
