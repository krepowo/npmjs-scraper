# npmjs-scraper

### Installing
```bash
npm i npmjs-scraper
```

### Methods
```js
searchPackageByName()
```
| Parameter |  Type  | Optional |
|-----------|--------|----------|
|   `name`  | String |  false   |
##### Usage Example:
```js
const { searchPackageByName } = require("npmjs-scraper")
searchPackageByName("node-superfetch").then(console.log).catch(console.error)
```
##### Returns: Array\<Search Result Data>

<hr>

```js
searchPackageByKeywords()
```
| Parameter |      Type      | Optional |
|-----------|----------------|----------|
|`keywords` | Array\<String> |  false   |
##### Usage Example:
```js
const { searchPackageByKeywords } = require("npmjs-scraper")
searchPackageByKeywords(["npmjs", "package"]).then(console.log).catch(console.error)
```
##### Returns: Array\<Search Result Data>

<hr>

```js
getPackageInfo()
```
|     Parameter     |  Type  | Optional |
|-------------------|--------|----------|
|      `name`       | String |  false   |
|     `options`     | Object |   true   |
| `options.version` | String |   true   |
##### Usage Example:
```js
const { getPackageInfo } = require("npmjs-scraper")
getPackageInfo("cheerio").then(console.log).catch(console.error)
```
##### Returns: Package Data

<hr>

```js
getAccountInfo()
```
| Parameter  |  Type  | Optional |
|------------|--------|----------|
| `username` | String |  false   |
##### Usage Example:
```js
const { getAccountInfo } = require("npmjs-scraper")
getAccountInfo("reconlx").then(console.log).catch(console.error)
```
##### Returns: Account Data

### Data Structure

#### Search Result Data
| Property |     Type    |
|----------|-------------|
|  `name`  |    String   |
|  `url`   |    String   |
| `author` | Author Data |

#### Author Data
| Property |  Type  |
|----------|--------|
|  `name`  | String |
|  `url`   | String |

#### Package Data
|      Property     |            Type           |
|-------------------|---------------------------|
|       `name`      |           String          |
|   `description`   |           String          |
|     `version`     |           String          |
|       `url`       |           String          |
|    `deprecated`   |           Boolean         |
|  `deprecatedtext` |           String          |
|      `public`     |           Boolean         |
|    `published`    |           String          |
|   `dependencies`  |           String          |
|    `dependents`   |           String          |
|     `versions`    |           String          |
|     `keywords`    |       Array\<String>      |
|    `repository`   |           String          |
|     `homepage`    |           String          |
| `weeklydownloads` |           String          |
|     `license`     |           String          |
|   `unpackedsize`  |           String          |
|    `totalfiles`   |           String          |
|   `lastpublish`   |           String          |
|  `collaborators`  | Array\<Collaborator Data> |

#### Collaborator Data
| Property |  Type  |
|----------|--------|
|  `name`  | String |
|  `icon`  | String |
|   `url`  | String |

#### Account Data
|     Property    |  Type  |
|-----------------|--------|
|      `name`     | String |
|      `icon`     | String |
|      `url`      | String |
|    `fullname  ` | String |
|     `github`    | String |
|    `twitter`    | String |
|    `packages`   | String |
| `organizations` | String |