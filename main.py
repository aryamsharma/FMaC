import requests, json
from bs4 import BeautifulSoup

data = requests.get("https://genshin.gg/builds/")

soup = BeautifulSoup(data.text, 'html.parser')
all_builds = soup.find("div", {"class": "builds-list"})

character_builds = {}

for build in all_builds.find_all("div", {"class": "builds-list-item"}):
    character_name = build.find("div", {"class": "build-name"}).text
    character_role = build.find("div", {"class": "build-role"}).text
    all_stats = []

    for artifact in build.find("div", {"class": "build-stats"}):
        name, info = artifact.text.split(":")
        info = [text.strip() for text in info.strip().split("/")]

        for k, v in enumerate(info):
            if v == "Physical DMG": info[k] = "Physical Damage Bonus"
            if v == "Anemo DMG": info[k] = "Anemo Damage Bonus"
            if v == "Cryo DMG": info[k] = "Cryo Damage Bonus"
            if v == "Electro DMG": info[k] = "Electro Damage Bonus"
            if v == "Dendro DMG": info[k] = "Dendro Damage Bonus"
            if v == "Geo DMG": info[k] = "Geo Damage Bonus"
            if v == "Hydro DMG": info[k] = "Hydro Damage Bonus"
            if v == "Pyro DMG": info[k] = "Pyro Damage Bonus"

            if v == "Rate": info[k] = "Crit Rate"
            if v == "DMG": info[k] = "Crit Damage"

            if v == "CRIT Rate": info[k] = "Crit Rate"
            if v == "CRIT DMG": info[k] = "Crit Damage"

            if v == "Healing": info[k] = "Healing Bonus"

            if v == "HP": info[k] = "HP%"
            if v == "ATK": info[k] = "ATK%"
            if v == "DEF": info[k] = "DEF%"

            if v == "EM": info[k] = "Elementary Mastery"
            if v == "ER": info[k] = "Energy Recharge"

            if v == "Elemental Master": info[k] = "Elementary Mastery"
        
        all_stats.append(info)

    character_builds[character_name] = {
        "role": character_role,
        "Sands": all_stats[0],
        "Goblet": all_stats[1],
        "Circlet": all_stats[2]}

with open("data.json", "w+") as f:
    f.write(json.dumps(character_builds, indent=4))
