import streamlit as st
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Load data
day_df = pd.read_csv('day.csv')
hour_df = pd.read_csv('hour.csv')

# Convert datetime columns to datetime type
datetime_columns = ["dteday"]

for column in datetime_columns:
    day_df[column] = pd.to_datetime(day_df[column])
    hour_df[column] = pd.to_datetime(hour_df[column])

# Mapping season, yr (year), and mnth (month) columns
season_mapping = {1: "spring", 2: "summer", 3: "fall", 4: "winter"}
yr_mapping = {0: 2011, 1: 2012}
mnth_mapping = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June',
    7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
}

day_df['season'] = day_df['season'].replace(season_mapping)
day_df['yr'] = day_df['yr'].replace(yr_mapping)
day_df['mnth'] = day_df['mnth'].replace(mnth_mapping)

hour_df['season'] = hour_df['season'].replace(season_mapping)
hour_df['yr'] = hour_df['yr'].replace(yr_mapping)
hour_df['mnth'] = hour_df['mnth'].replace(mnth_mapping)

clean_day_df = day_df
clean_hour_df = hour_df

# Calculate rents by season
rents_by_season = clean_day_df.groupby('season')[['casual', 'registered', 'cnt']].mean().reset_index()
rents_by_season = rents_by_season.rename(columns={'cnt': 'total_average'}).astype({
    'casual': int,
    'registered': int,
    'total_average': int
}).sort_values(by='total_average', ascending=False)

# Calculate contribution by hour
contribution_by_hour = clean_hour_df.groupby('hr').agg(
    avg_casual=('casual', 'mean'),
    avg_register=('registered', 'mean'),
    total_average=('cnt', 'mean')
).reset_index().astype({
    'avg_casual': int,
    'avg_register': int,
    'total_average': int
})

# Streamlit App
st.title("Dashboard Sewa Sepeda")

# Display rents by season chart with different colors and values
st.subheader("Sewa per Musim")
fig_season = plt.figure()
# palette = sns.color_palette("pastel")
bar_plot = sns.barplot(x='season', y='total_average', data=rents_by_season, palette='pastel', hue = 'season')
for index, value in enumerate(rents_by_season['total_average']):
    bar_plot.text(index, value, str(value), ha='center', va='bottom')
st.pyplot(fig_season)

# Display rents by season table
st.subheader("Tabel Sewa per Musim")
st.table(rents_by_season.set_index('season'))

# Display contribution by hour chart with all values and increased size
st.subheader("Kontribusi per Jam")
fig_hour = plt.figure(figsize=(12, 6))  # Set the figsize parameter to adjust the size
sns.lineplot(x='hr', y='avg_casual', data=contribution_by_hour, label='Casual', marker='o')
sns.lineplot(x='hr', y='avg_register', data=contribution_by_hour, label='Registered', marker='o')
sns.lineplot(x='hr', y='total_average', data=contribution_by_hour, label='Total Average', marker='o')
plt.xticks(contribution_by_hour['hr'])
plt.legend()
st.pyplot(fig_hour)

# Display contribution by hour table
st.subheader("Tabel Kontribusi per Jam")
st.table(contribution_by_hour.set_index('hr'))

# Display summary for rents_by_day
st.subheader("Analisa Sewa per Musim")

summary_text = """
**Pertanyaan 1**

Bagaimana permintaan sewa sepeda bervariasi di berbagai musim?
Berdasarkan data yang diperoleh, kita dapat mengetahui bahwa :
"""

view_more = st.checkbox("View More")

if view_more:
    full_summary_text = """
    **Pertanyaan 1**

    Bagaimana permintaan sewa sepeda bervariasi di berbagai musim?
    Berdasarkan data yang diperoleh, kita dapat mengetahui bahwa :

    1. Musim Gugur (Fall) adalah musim yang paling banyak orang menyewa sepeda dibanding musim lainnya. Hal ini menunjukkan minat orang-orang lebih tinggi untuk melakukan sewa sepeda pada musim gugur.
    2. Musim Semi (Spring) merupakan musim dengan rata-rata sewa sepeda terendah. Hal ini mungkin menunjukkan bahwa cuaca atau faktor lain mempengaruhi minat orang-orang untuk menyewa sepeda.
    3. Musim Panas memiliki rata-rata sewa sepeda yang lebih tinggi dibanding musim dingin. Kemungkinan ini terjadi karena cuaca yang lebih hangat dan kondisi yang lebih menguntungkan untuk bersepeda selama musim panas.
    4. Terdapat perbedaan yang signifikan antara rata-rata sewa pada musim gugur dengan musim lainnya karena beberapa faktor seperti festival, acara khusus, dan kondisi lainnya.
    """
    st.write(full_summary_text)
else:
    st.write(summary_text)


# Display summary for contribution_by_hour
st.subheader("Analisa Kontribusi per Jam")

summary_text_2 = """
**Pertanyaan 2**

Bagaimana kontribusi pengguna casual dan terdaftar terhadap jumlah sewa sepeda per jam?
Berdasarkan data yang diperoleh, dapat kita ketahui :
"""

view_more_2 = st.checkbox("View More...")

if view_more_2:
    full_summary_text_2 = """
    **Pertanyaan 2**
    
    Bagaimana kontribusi pengguna casual dan terdaftar terhadap jumlah sewa sepeda per jam?
    Berdasarkan data yang diperoleh, dapat kita ketahui :

    1. Jam 17 (5:00 PM) memiliki total rata-rata sewa sepeda per jam tertinggi, mencapai 461.
    2. Jam 8 (8:00 AM) dan jam 18 (6:00 PM) juga merupakan jam-jam dengan kontribusi tinggi, dengan total rata-rata masing-masing 359 dan 425.
    3. Pengguna terdaftar memberikan kontribusi yang lebih besar dibandingkan pengguna casual pada setiap jam.
    4. Terdapat perbedaan yang signifikan antara rata-rata kontribusi pengguna casual dan terdaftar pada beberapa jam tertentu. Sebagai contoh, pada jam 17 (5:00 PM), kontribusi pengguna terdaftar mencapai 387, sementara pengguna casual hanya 74.
    5. Kontribusi pengguna casual dan terdaftar cenderung meningkat selama jam sibuk, terutama pada jam 8 (8:00 AM) dan jam 17 (5:00 PM).
    """
    st.write(full_summary_text_2)
else:
    st.write(summary_text_2)




st.caption ('Revardy D. Caear (c) 2023 | Dicoding Indonesia | Proyek Analisis Data : Bike Sharing Dataset')