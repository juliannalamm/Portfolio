import os
import pandas as pd
import matplotlib.pyplot as plt

csv = 'public/data/subclustered_bb.csv'
output = 'public/images/cluster_bbs'
os.makedirs(output, exist_ok=True)

df = pd.read_csv(csv)

for cluster_id in sorted(df['Subcluster'].unique()):
    dfc = df[df['Subcluster'] == cluster_id]

    fig = plt.figure(figsize=(12, 12))
    ax = fig.add_subplot(111)

    for fid, grp in dfc.groupby('fid'):
        x = grp['bb0'].values
        y = grp['bb1'].values
        ax.plot(x, y, linewidth=3)

    ax.axis('equal')
    ax.axis('off')
    ax.set_position([0, 0, 1, 1])  # fill entire figure
    ax.set_facecolor('black')
    fig.patch.set_facecolor('black')
    ax.margins(0)

    out_path = f'{output}/cluster_{cluster_id}.png'
    plt.savefig(out_path, bbox_inches='tight', pad_inches=0)
    plt.close()
    print(f"Saved {out_path}")
