## Context

When using dynamic imports along with `--global` option, exposed variable are being redefined by dynamically imported bundle.

Clone repo from "Code sample" section.

Run command:
`parcel serve src/index.html -- global foo`

In browser console run:
`foo.renderWidget()`

It logs:
`I'm index`
`I'm widget`

Run `foo.renderWidget()` again.

It fails with error message:
`Uncaught TypeError: foo.renderWidget is not a function`

## Expected Behavior

It shouldn't fail.
It should log the same as on first run.

## Current Behavior

When bundle imported dynamically it redefines `foo` variable with own exports.
You can check `foo` variable in console before run `foo.renderWidget()` and after running it and make sure that it redefined.

## Possible Solution

IMO dynamic imported bundles should ignore `--global` option and don't expose any variables.

## Code Sample

https://github.com/sigerello/parcel-bug

```js
// src/index.js
export function renderWidget() {
  console.log("I'm index")
  import("./widget").then(widget => widget.render())
}
```
```js
// src/widget.js
export function render() {
  console.log("I'm widget")
}
```

## Environment

| Software         | Version(s) |
| ---------------- | ---------- |
| Parcel           |      1.9.7
| Node             |      10.5.0
| npm/Yarn         |     6.2.0
| Operating System |     macOS High Sierra 10.13.5
