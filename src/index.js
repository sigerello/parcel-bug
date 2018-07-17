export function renderWidget() {
  console.log("I'm index")
  import("./widget").then(widget => widget.render())
}
