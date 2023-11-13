const all_attributes = [
    "Elementary Mastery",
    "Energy Recharge",
    "Crit Damage",
    "Crit Rate",
    "HP%",
    "DEF%",
    "ATK%",
    "Healing Bonus",
    "Physical Damage Bonus",
    "Pyro Damage Bonus",
    "Electro Damage Bonus",
    "Cryo Damage Bonus",
    "Hydro Damage Bonus",
    "Dendro Damage Bonus",
    "Geo Damage Bonus",
    "Anemo Damage Bonus"
];

const total_attributes = all_attributes.length;

const search_input = document.getElementById("search-input");
const imgs = document.getElementsByClassName("artifact-icon");

let selected_artifact = "";
let selected_attribute = "";

const data_table = get_data()

data_table.then((data) => {
    for (let [key, value] of data)
    {
        const val_map = new Map(Object.entries(value));
        data.set(key, val_map)
    }
    console.log(data);
});

search_input.addEventListener("keyup", display_characters);

search_input.addEventListener("keyup", (event) => {
    // Deleting existing elements
    elements = document.getElementsByClassName("stat");
    while (elements.length) { elements[0].remove(); }

    // Adding new elements
    const { value } = event.target;
    const searchQuery = value.toLowerCase();
    let to_be_displayed = [];

    for (const attribute of all_attributes)
    {
        if (attribute.toLowerCase().includes(searchQuery))
        {
            to_be_displayed.push(attribute);
        }
    }

    console.log(to_be_displayed);
    let count = 0;

    if (total_attributes != to_be_displayed.length)
    {
        for (const ele of to_be_displayed)
        {
            let element = document.createElement("li");
            element.className = "stat";
            element.id = count.toString();
            element.onclick = select_attribute;
            element.appendChild(document.createTextNode(ele));
            document.getElementById("search-results").appendChild(element);
            count++;
        }
    }
});

async function get_data()
{
    const res = await fetch('./data.json');
    const json_format = await res.json();
    return new Map(Object.entries(json_format));;
}

function display_characters()
{
    elements = document.getElementsByClassName("builds");
    while (elements.length) { elements[0].remove(); }

    if (selected_artifact == "" || selected_attribute == "")
    {
        return
    }
    data_table.then((data) => {
        console.log(data);
        let count = 0;

        for (let [key, value] of data)
        {
            const possible_attributes = value.get(selected_artifact);

            for (const attribute of possible_attributes)
            {
                if (selected_attribute == attribute)
                {
                    console.log(selected_attribute, attribute)
                    let element = document.createElement("li");
                    element.className = "builds";
                    element.id = count.toString();
                    element.onclick = select_attribute;
                    element.appendChild(
                        document.createTextNode(
                            key + "'s " + selected_artifact
                            ));
                    document.getElementById("search-output").appendChild(element);
                    count++;
                }
            }

        }
    });
}

function select_attribute()
{
    elements = document.getElementsByClassName("stat");
    for (let element of elements)
    {
        if (element.id == this.id)
        {
            selected_attribute = this.textContent;
            element.style.opacity = "40%";
            display_characters();
            continue;
        }
        element.style.opacity = "100%";
    }
}

function select_artifact(ele)
{
    elements = document.getElementsByClassName("artifact");
    for (let element of elements)
    {
        if (element.id == ele.id)
        {
            selected_artifact = ele.id;
            element.style.opacity = "40%";
            display_characters();
            continue;
        }
        element.style.opacity = "100%";
    }
}