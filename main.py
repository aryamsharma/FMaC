import requests, json
from bs4 import BeautifulSoup

data = requests.get("https://genshin.gg/builds/")

soup = BeautifulSoup(data.text, 'html.parser')
all_builds = soup.find("div", {"class": "builds-list"})

character_builds = {}

for build in all_builds.find_all("div", {"class": "builds-list-item"}):
    name = build.find("div", {"class": "build-name"}).text
    role = build.find("div", {"class": "build-role"}).text
    artifacts = []

    for artifact in build.find("div", {"class": "build-stats"}):
        data = artifact.text
        length = len(data.split(":")[0]) + 2
        artifacts.append([info for info in data[length:].split() if info != "/"])

    character_builds[name] = [role, *artifacts]

with open("data.json", "w+") as f:
    f.write(json.dumps(character_builds, indent=4))