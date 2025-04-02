import os
import pandas as pd
import plotly.graph_objects as go

# Load coordinate data from CSV
df = pd.read_csv('public/data/initialcluster_w_bb.csv')

# Clean the fid column (trim spaces)
df['fid'] = df['fid'].astype(str).str.strip()

# Create output directory for images
output_dir = 'public/images/trajectories'
os.makedirs(output_dir, exist_ok=True)

# Group by fid to generate an image per trajectory
grouped = df.groupby('fid')

for fid, group in grouped:
    # Only generate an image if there are at least two points for a line
    if len(group) < 2:
        continue
    
    # Create a mini line chart for the trajectory
    fig = go.Figure(data=go.Scatter(
        x = group['bb0'],
        y = group['bb1'],
        mode = 'lines',
        line = dict(width=2)
    ))
    
    # Minimal layout: small size, no axes for clarity in tooltip
    fig.update_layout(
        width=150,
        height=100,
        margin=dict(l=5, r=5, t=5, b=5),
        xaxis_visible=False,
        yaxis_visible=False
    )
    
    # Save the figure as a PNG file using the fid as filename
    image_filename = os.path.join(output_dir, f'{fid}.png')
    try:
        fig.write_image(image_filename)
        print(f'Saved image for fid: {fid} to {image_filename}')
    except Exception as e:
        print(f"Error saving image for fid {fid}: {e}")
        
    break  # Remove this line to generate images for all trajectories
