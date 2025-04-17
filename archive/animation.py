import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import matplotlib.image as mpimg
from matplotlib.offsetbox import OffsetImage, AnnotationBbox

# 1) Load your data
df = pd.read_csv('public/data/subclustered_bb.csv')
fids = [
    "cl4yeq6mi000v356pa8cqxrei", "cl4yenvr8000n356pc94w4l2z", 
    "cl4yeinyq000j356pu65gmiti", "cl4yef7ve000f356po65wg3a0",
    "cl4wf08be0043356h59jlarps", "cl3lavkqa00343r6cfbfc0lnk",
    "ckywzsbvn0006386lup64vzl3", "ckyw6zzlj001r3867thf0fuy7",
    "cl4xuuxyo000n356f8derlp9a", "cl4sbazoa001c356f4lz6t5lf",
    "cl4sba4bd000l356fifxda70f"
]
df = df[df['fid'].isin(fids)].sort_values(['fid','frame_number'])
df['subcluster_code'] = df['Subcluster'].astype('category').cat.codes

# 2) Prep frame times
all_frames = sorted(df['frame_number'].unique())
times = all_frames[::20]    # sample every 20 frames

# 3) Load the sperm icon
icon = mpimg.imread('src/assets/sperm.png')         # your PNG file
zoom = 0.07                                   # tweak so it’s not too big
# we’ll create a factory to avoid re-reading/rescaling each time:
def get_icon():
    return OffsetImage(icon, zoom=zoom)

# 4) Set up the plot
fig, ax = plt.subplots(figsize=(6,6))
scat = ax.scatter([], [], c=[], cmap='tab10', s=40)
ax.set_xlim(df['bb0'].min(), df['bb0'].max())
ax.set_ylim(df['bb1'].min(), df['bb1'].max())
ax.set_xlabel('bb0')
ax.set_ylabel('bb1')

# 5) Annotate each starting position
starts = df.groupby('fid').first().reset_index()
for _, row in starts.iterrows():
    ab = AnnotationBbox(
        get_icon(),
        (row['bb0'], row['bb1']),
        frameon=False
    )
    ax.add_artist(ab)

# 6) Animation update
def update(i):
    cur = times[i]
    sub = df[df['frame_number'] <= cur]
    scat.set_offsets(sub[['bb0','bb1']].values)
    scat.set_array(sub['subcluster_code'].values)
    ax.set_title(f'Frame ≤ {cur}')
    return scat,

anim = FuncAnimation(fig, update, frames=len(times), interval=250, blit=True)

# 7) Save or display
anim.save('trajectory_with_icons.mp4', writer='ffmpeg', fps=5)
# OR, in a notebook:
# from IPython.display import HTML
# HTML(anim.to_jshtml())
