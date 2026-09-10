export async function load() {
    const res = await fetch("https://fdnd.directus.app/items/person?fields=*&filter[id][_eq]=251");
    const data = await res.json();
    const person = data.data[0];

    // custom is een JSON-string, dus parsen naar een echt object
    person.custom = JSON.parse(person.custom);

    return {
        person
    };
}
