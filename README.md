# Fetcher
### Just another fetch method
---
It uses `window.fetch` or `XMLHttpRequest` (if `window.fetch` is not supported).

---

## Usage
---
- Include in your page
```<script type="text/javascript" src="PATH-TO-JS/fetcher.js"></script>```
* Fetcher has currently 4 methods:
  * ```fetcher.get(options, callback)```
  * ```fetcher.delete(options, callback)```
  * ```fetcher.put(options, callback)```
  * ```fetcher.post(options, callback)```

* obj = object that contains mandatory and optional attributes
  * Mandatory:
  ```
  {
    url: [url STRING]
  }
  ```
  * Optional:
  ```
  {
    body: [obj with params],
    headers: [obj with params]
  }
  ```
* callbak = function runned when data correctly returned

## Examples
---
```
function mycallback(data) { console.log(data) };

fetcher.get({url: 'http://jsonplaceholder.typicode.com/posts'}, mycallback)
fetcher.delete({url: 'http://jsonplaceholder.typicode.com/posts/1'}, mycallback)
fetcher.put({url: 'http://jsonplaceholder.typicode.com/posts/1', body: {id: 1, title: 'fed', body: 'bucchi', userId: 1}}, mycallback)
fetcher.post({url: 'http://jsonplaceholder.typicode.com/posts', body: {title: 'fed', body: 'bucchi', userId: 1}}, mycallback)
```


## Try it
---
- You can use this Open API: https://github.com/typicode/jsonplaceholder
- Open index.html
- From Developer Console
  - Create a callback, something like: ```function mycallback(data) { console.log(data) };```
  - Call GET, run something like: `fetcher.get({url: 'http://jsonplaceholder.typicode.com/posts'}, mycallback);`


## TODO
---
- Add Tests
