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

## Author

* **wan** - *Creator* - [Profile](https://github.com/sakuwan)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
