# Snippets

Snippets from various projects & frameworks that are worth publishing for quick access, mostly Vue or JS related.

## Vue

### Components

* **Keyframe** - Keyframing component for simple frame or delay based animations
* **AspectBox** - Container component for maintaining a provided aspect ratio, using the padding-top trick

### Composables

* **useClasses** - Very simple composable, manage element classes through a provided prop

## JS

* **createTailwindConfig** - Create or extend a tailwindcss config with a custom JSON configuration file, supporting creating utility elements, variants, and overriding or extending the theme.

For example, a configuration that generates flex-basis utility classes with responsive variants is as follows, along with extending colors and overriding screens:

```json
{
  "flex-basis": {
    "@@utility": true,
    "@@variants": ["responsive"],

    "1": "100%",
    "2": "50%",
    "3": "33.333333%",
    "4": "25%",
    "5": "20%",
    "6": "16.666666%",
    "7": "14.285714%",
    "8": "12.5%",

    "auto": "auto"
  },

  "colors": {
    "@@extends": true,

    "primary": "#FFF",
    "secondary": "#000"
  },
  
  "screens": {
    "xs": "22.5rem",
    "sm": "30rem",
    "md": "48rem",
    "lg": "64rem"
  }
}
```

* **getScrollbarWidth** - Fetches the system scrollbar width, generally used for hiding or customizing the scrollbar. Less useful as the CSS Scrollbar API becomes more normalized, but still useful in some cases.

```js
// For Windows, expect scrollbarWidth === 17 (px)
const scrollbarWidth = getScrollbarWidth();
```

* **preloadImage** - Create and return a promise that resolves when it successfully loads a provided image URL, or rejects on fail. Useful for caching images that might be unable to be preloaded in the standard HTML ways, due to v-if and other conditional rendering. The responsive and transformed variants are simply for srcset & preloading functionality.

```js
const imgsToLoad = ['/img/a.jpg', '/img/b.jpg'];
Promise.all(imgsToLoad.map((url) => preloadImage(url)))
  .then((urls) => {
    // urls: Successfully loaded URLs
  })
  .catch((url) => {
    // url: Failed URL, shortcircuits the promise
  });
```

* **formatYAML** - Format imported YAML strings into more HTML-friendly strings with basic Markdown-style support for styling. Naturally, this should be further sanitized for any actual usage.

```js
/*
  testString: |
    **This is bold**
    __This is italic__
    !!This is underlined!!
    ~~This is striked out~~

    Newlines are replaced with <br>
    [This is a hyperlink](https://www.github.com/sakuwan)
*/

const formattedYAML = formatYAML(yaml.testString);

/*
  formattedYAML:
    <strong>This is bold</strong><br>
    <em>This is italic</em><br>
    <ins>This is underlined</ins><br>
    <del>This is striked out</del><br>
    <br>
    Newlines are replaced with <br><br>
    <a href="https://www.github.com/sakuwan"><ins>This is a hyperlink</ins></a>
*/
```

## Author

* **wan** - *Creator* - [Profile](https://github.com/sakuwan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
