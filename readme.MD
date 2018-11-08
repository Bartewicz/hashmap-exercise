# Hashmap implementation

A simple static website for hashmap implementation practice in VanillaJS.
Try it out [here]()

## How does it work

There's a predefault data of 16 objects in an array.

You can find a list of predefault keys and values at the end of this readme.

As soon as the script loads this data is stored into a newly created hashmap. This process is created in a new Promise to behave like an API call. As the Promise is resolved user gets access to any of this actions:

- search a value of an existing object by a key,
- remove already found object,
- add a new object with a key and value,
- clear whole hashmap.

User is also informed:

- how many objects are already stored,
- if a key to be added is already taken,
- that both key and value are necessary to add a new object.

## Hashmap details

A hashmap is created using an ES6 class instance.

It's properties:

- `table` - an array in which objects are stored,
- `total` - amount of all stored objects,
- `size` - constans length of array.

And methods:

- `hashKey(key)` - hashes a key to receive an index of the table,
- `get(key)` - retrieves object using a key,
- `set(key, value)` - at first checks for a newly declared key in a table and stores object inside the table if possible,
- `remove(key)` - deletes a previously found object,
- `clear()` - deletes all objects.

## Predefault data

>const data = [
>  { key: 'l-gdansk', value: 'Lechia Gdańsk' },
>  { key: 'l-warszawa', value: 'Legia Warszawa' },
>  { key: 'p-gliwice', value: 'Piast Gliwice' },
>  { key: 'j-bialystok', value: 'Jagiellonia Białystok' },
>  { key: 'w-krakow', value: 'Wisła Kraków' },
>  { key: 'cracovia', value: 'KS Cracovia' },
>  { key: 'k-kielce', value: 'Korona Kielce' },
>  { key: 'l-poznan', value: 'Lech Poznań' },
>  { key: 'p-szczecin', value: 'Pogoń Szczecin' },
>  { key: 'a-gdynia', value: 'Arka Gdynia' },
>  { key: 'z-lubin', value: 'Zagłębie Lubin' },
>  { key: 's-wroclaw', value: 'Śląsk Wrocław' },
>  { key: 'w-plock', value: 'Wisła Płock' },
>  { key: 'm-legnica', value: 'Miedź Legnica' },
>  { key: 'g-zabrze', value: 'Górnik Zabrze' },
>  { key: 'z-sosnowiec', value: 'Zagłębie Sosnowiec' }
>]